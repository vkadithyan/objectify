'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Sparkles, Upload, Camera, Wand2, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Mood } from '@/types/post'

const moods: { value: Mood; label: string; emoji: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'excited', label: 'Excited', emoji: '🤩' },
  { value: 'peaceful', label: 'Peaceful', emoji: '😌' },
  { value: 'contemplative', label: 'Contemplative', emoji: '🤔' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'calm', label: 'Calm', emoji: '🧘' },
  { value: 'curious', label: 'Curious', emoji: '🤨' }
]

export default function CreatePostPage() {
  const router = useRouter()
  const [step, setStep] = useState<'upload' | 'mood' | 'generate' | 'preview'>('upload')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<Mood | ''>('')
  const [generatedStory, setGeneratedStory] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setStep('mood')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setStep('generate')
  }

  const generateStory = useCallback(async () => {
    if (!imageFile || !selectedMood) return

    setIsGenerating(true)
    setGeneratedStory('')
    
    try {
      const token = localStorage.getItem('token')
      
      // Try API if token exists
      if (token) {
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('mood', selectedMood)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/generate-story`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          setGeneratedStory(data.story)
          setStep('preview')
          return
        }
      }
      
      // Fallback to demo story generation
      const demoStories = {
        happy: "This object is radiating pure joy today! It's been waiting for this moment to shine and share its happiness with the world. Every curve and detail seems to sparkle with delight! ✨",
        sad: "This object carries a melancholy beauty today. It has stories of quiet moments and gentle tears, but there's wisdom in its sadness that makes it deeply meaningful. 💙",
        excited: "This object is absolutely buzzing with excitement! It can barely contain its enthusiasm and is ready to embark on the most amazing adventure. The energy is contagious! 🚀",
        peaceful: "This object has found its zen today. It radiates calm and tranquility, like a gentle breeze on a quiet morning. Its presence brings instant serenity. 🕊️",
        contemplative: "This object is deep in thought today, pondering life's mysteries and beautiful complexities. Its quiet wisdom speaks volumes without saying a word. 🤔",
        energetic: "This object is charged up and ready to take on the world! Its dynamic energy is infectious and inspiring. Nothing can slow it down today! ⚡",
        calm: "This object embodies perfect stillness and peace. It's like a meditation in physical form, bringing balance and harmony to everything around it. 🧘",
        curious: "This object is fascinated by everything around it today! Its curiosity is boundless, always wondering, always exploring, always learning something new. 🔍"
      }
      
      setGeneratedStory(demoStories[selectedMood] || demoStories.happy)
      setStep('preview')
      toast.success('Demo story generated! (Login for AI-powered stories)')
      
    } catch (error) {
      console.error('[ERROR] Error generating story:', error)
      // Always fallback to demo stories
      const demoStories = {
        happy: "This object is radiating pure joy today! ✨",
        sad: "This object carries a melancholy beauty today. 💙",
        excited: "This object is absolutely buzzing with excitement! 🚀",
        peaceful: "This object has found its zen today. 🕊️",
        contemplative: "This object is deep in thought today. 🤔",
        energetic: "This object is charged up and ready! ⚡",
        calm: "This object embodies perfect stillness. 🧘",
        curious: "This object is fascinated by everything! 🔍"
      }
      
      setGeneratedStory(demoStories[selectedMood] || demoStories.happy)
      setStep('preview')
      toast.success('Demo story generated!')
    } finally {
      setIsGenerating(false)
    }
  }, [imageFile, selectedMood])

  const handlePost = useCallback(async () => {
    if (!selectedMood || !generatedStory || !imagePreview) return

    setIsPosting(true)
    
    try {
      const token = localStorage.getItem('token')
      
      // Try API if token exists
      if (token) {
        const postResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            imageUrl: imagePreview,
            mood: selectedMood,
            story: generatedStory
          })
        })
        
        if (postResponse.ok) {
          const postData = await postResponse.json()
          toast.success('Post created successfully!')
          
          // Reset form and redirect
          setImageFile(null)
          setImagePreview('')
          setSelectedMood('')
          setGeneratedStory('')
          setIsGenerating(false)
          router.push('/feed')
          return
        }
      }
      
      // Demo mode: create and save post to localStorage
      const newPost = {
        id: Date.now().toString(),
        userId: 'demo_user',
        username: 'You',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        imageUrl: imagePreview, // This contains the base64 data URL from the uploaded image
        mood: selectedMood,
        story: generatedStory,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      }
      
      // Save to localStorage - this will appear at the top of the feed
      const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      const updatedPosts = [newPost, ...existingPosts] // New post goes first
      localStorage.setItem('userPosts', JSON.stringify(updatedPosts))
      
      console.log('✅ Post saved to localStorage:', newPost)
      
      toast.success('🎉 Post created! Check it out at the top of your feed!')
      
      // Reset form
      setImageFile(null)
      setImagePreview('')
      setSelectedMood('')
      setGeneratedStory('')
      setIsGenerating(false)
      
      // Redirect to feed immediately to see the new post
      setTimeout(() => {
        router.push('/feed')
      }, 1000) // Small delay to show success message
      
    } catch (error) {
      console.error('[ERROR] Error creating post:', error)
      // In demo mode, still show success and save to localStorage
      const newPost = {
        id: Date.now().toString(),
        userId: 'demo_user',
        username: 'You',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        imageUrl: imagePreview,
        mood: selectedMood,
        story: generatedStory,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      }
      
      const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      const updatedPosts = [newPost, ...existingPosts]
      localStorage.setItem('userPosts', JSON.stringify(updatedPosts))
      
      toast.success('🎉 Post created! Check it out at the top of your feed!')
      
      // Reset form and redirect
      setImageFile(null)
      setImagePreview('')
      setSelectedMood('')
      setGeneratedStory('')
      setIsGenerating(false)
      
      setTimeout(() => {
        router.push('/feed')
      }, 1000)
    } finally {
      setIsPosting(false)
    }
  }, [selectedMood, generatedStory, imagePreview, imageFile, router])



  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/feed" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Create Post</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {['upload', 'mood', 'generate', 'preview'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === stepName 
                  ? 'bg-primary-600 text-white' 
                  : index < ['upload', 'mood', 'generate', 'preview'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              {index < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < ['upload', 'mood', 'generate', 'preview'].indexOf(step)
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Upload Image */}
          {step === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Object</h2>
                <p className="text-gray-600">Take a photo or upload an image of the object you want to bring to life</p>
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-primary-600 font-medium">Drop the image here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">Drag & drop an image here, or click to select</p>
                    <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, WebP (max 5MB)</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Mood */}
          {step === 'mood' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Mood</h2>
                <p className="text-gray-600">What mood should your object have today?</p>
              </div>

              {imagePreview && (
                <div className="mb-6">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={400}
                    className="w-full max-w-sm mx-auto rounded-lg object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMood === mood.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="text-sm font-medium">{mood.label}</div>
                  </motion.button>
                ))}
              </div>
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      // Randomly select a different mood
                      const otherMoods = moods.filter(m => m.value !== selectedMood)
                      const randomMood = otherMoods[Math.floor(Math.random() * otherMoods.length)]
                      setSelectedMood(randomMood.value)
                    }}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium underline"
                  >
                    🎲 Try a different emotion
                  </button>
                  
                  <div>
                    <motion.button
                      onClick={() => setStep('generate')}
                      className="btn-primary inline-flex items-center px-6 py-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue to Story Generation
                      <Wand2 className="w-4 h-4 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Generate Story */}
          {step === 'generate' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Story</h2>
                <p className="text-gray-600">Let AI create a magical backstory for your object</p>
              </div>

              <div className="flex items-center justify-center mb-8">
                <motion.button
                  onClick={generateStory}
                  disabled={isGenerating}
                  className="btn-primary inline-flex items-center text-lg px-8 py-4 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Story
                    </>
                  )}
                </motion.button>
              </div>

              {imagePreview && (
                <div className="text-center">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={300}
                    height={300}
                    className="w-full max-w-xs mx-auto rounded-lg object-cover mb-4"
                  />
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                    <span className="text-2xl">{moods.find(m => m.value === selectedMood)?.emoji}</span>
                    <span className="font-medium text-gray-900">{selectedMood}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Preview & Post */}
          {step === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview Your Post</h2>
                <p className="text-gray-600">Review your object's story before sharing</p>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={400}
                    className="w-full max-w-sm mx-auto rounded-lg object-cover"
                  />
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
                    <span className="text-2xl">{moods.find(m => m.value === selectedMood)?.emoji}</span>
                    <span className="font-medium text-gray-900">{selectedMood}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Generated Story:</h3>
                  <p className="text-gray-700 leading-relaxed">{generatedStory}</p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep('generate')}
                    className="flex-1 btn-outline"
                  >
                    Regenerate Story
                  </button>
                  <button
                    onClick={handlePost}
                    disabled={isPosting}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {isPosting ? 'Posting...' : 'Share Post'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
