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

  const generateStory = async () => {
    if (!imageFile || !selectedMood) return

    setIsGenerating(true)
    
    try {
      // TODO: Implement actual AI story generation
      // This would typically involve:
      // 1. Upload image to Cloudinary
      // 2. Call OpenAI API with image URL and mood
      // 3. Return generated story
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockStories = {
        happy: "This object is absolutely beaming with joy today! It's been waiting for this moment to shine and share its positive energy with the world. The way it catches the light makes it feel like it's doing a little happy dance! ✨",
        sad: "This object seems to be having a melancholic moment. Maybe it's missing its companion or feeling a bit lonely today. But even in its sadness, there's a quiet beauty that speaks to the soul.",
        excited: "WOW! This object is practically vibrating with excitement! It's like it just won the lottery or discovered a superpower. The energy is contagious - you can almost feel it buzzing with anticipation! 🚀",
        peaceful: "There's such a serene calmness about this object today. It's like it's found its zen moment, floating in a state of perfect tranquility. The peace it radiates is almost meditative.",
        contemplative: "This object appears to be deep in thought, pondering the mysteries of the universe. It's having one of those philosophical moments where everything makes sense and nothing makes sense at the same time.",
        energetic: "This object is bursting with life and energy! It's like it just had three cups of coffee and is ready to take on the world. The dynamic vibes are off the charts! ⚡",
        calm: "There's a gentle, soothing presence about this object. It's like a warm hug or a soft lullaby - just being near it brings a sense of inner peace and relaxation.",
        curious: "This object has that spark of curiosity in its eyes (if it had eyes!). It's like it's constantly asking 'what if?' and exploring the world with wonder and amazement."
      }
      
      setGeneratedStory(mockStories[selectedMood])
      setStep('preview')
    } catch (error) {
      toast.error('Failed to generate story. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePost = async () => {
    if (!imageFile || !selectedMood || !generatedStory) return

    setIsPosting(true)
    
    try {
      // TODO: Implement actual post creation
      // This would typically involve:
      // 1. Upload image to Cloudinary
      // 2. Save post to database
      // 3. Redirect to feed
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Post created successfully!')
      router.push('/feed')
    } catch (error) {
      toast.error('Failed to create post. Please try again.')
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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
      </header>

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
                    onClick={() => handleMoodSelect(mood.value)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="font-medium text-gray-900">{mood.label}</div>
                  </motion.button>
                ))}
              </div>
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
    </div>
  )
}
