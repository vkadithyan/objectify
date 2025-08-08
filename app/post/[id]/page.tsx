'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, MessageCircle, Share2, Clock, Sparkles } from 'lucide-react'
import { Post } from '@/types/post'
import { formatDistanceToNow } from 'date-fns'

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  excited: '🤩',
  peaceful: '😌',
  contemplative: '🤔',
  energetic: '⚡',
  calm: '🧘',
  curious: '🤨',
  cool: '😎',
  warm: '🌞',
  cozy: '☕',
  nostalgic: '📸',
  organized: '📐',
  reflective: '🪞'
}

const moodColors: Record<string, string> = {
  happy: 'bg-yellow-100 text-yellow-800',
  sad: 'bg-blue-100 text-blue-800',
  excited: 'bg-orange-100 text-orange-800',
  peaceful: 'bg-green-100 text-green-800',
  contemplative: 'bg-purple-100 text-purple-800',
  energetic: 'bg-red-100 text-red-800',
  calm: 'bg-teal-100 text-teal-800',
  curious: 'bg-pink-100 text-pink-800',
  cool: 'bg-indigo-100 text-indigo-800',
  warm: 'bg-amber-100 text-amber-800',
  cozy: 'bg-brown-100 text-brown-800',
  nostalgic: 'bg-sepia-100 text-sepia-800',
  organized: 'bg-gray-100 text-gray-800',
  reflective: 'bg-slate-100 text-slate-800'
}

// Demo data - same as in feed page
const demoData: Post[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'creative_soul',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This vintage coffee mug has seen countless mornings and late-night conversations. Today, it feels particularly reflective, holding within its ceramic walls the warmth of memories and the promise of new stories yet to be shared over steaming cups of inspiration. ☕✨',
    likes: ['user2', 'user5', 'user8'],
    comments: [
      { id: '1', userId: 'user2', username: 'coffee_lover', text: 'This mug has such character! ☕', createdAt: new Date() },
      { id: '2', userId: 'user5', username: 'vintage_collector', text: 'Love the patina on this piece! 🎨', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    userId: 'user2',
    username: 'vintage_typewriter',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d0?w=600&h=600&fit=crop',
    mood: 'nostalgic',
    story: 'This classic typewriter is feeling wonderfully nostalgic today! Each key holds the memory of countless stories, love letters, and important documents. The satisfying click-clack of its keys echoes through time, connecting the past with the present in the most beautiful way. 📝✨',
    likes: ['user1', 'user4', 'user7'],
    comments: [
      { id: '3', userId: 'user1', username: 'creative_soul', text: 'The sound of typewriter keys is pure magic! ✨', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-14T14:20:00Z')
  },
  {
    id: '3',
    userId: 'user3',
    username: 'plant_parent',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'This little succulent is radiating pure zen energy today! Despite its small size, it carries the wisdom of resilience and growth. Every day, it quietly transforms sunlight into life, teaching us that sometimes the most profound changes happen slowly and silently. 🌱💚',
    likes: ['user2', 'user6', 'user9'],
    comments: [
      { id: '4', userId: 'user6', username: 'garden_guru', text: 'Plants are the best teachers of patience! 🌿', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-13T09:15:00Z')
  }
  // Note: In a real implementation, you would include all 30 demo posts here
]

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const postId = params.id as string
    
    // First check localStorage for user-created posts
    const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
    let foundPost = userPosts.find((p: Post) => p.id === postId)
    
    // If not found in user posts, check demo data
    if (!foundPost) {
      foundPost = demoData.find(p => p.id === postId)
    }
    
    if (foundPost) {
      setPost(foundPost)
      // Check if user has liked this post
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
      setIsLiked(likedPosts.includes(postId))
    }
    
    setLoading(false)
  }, [params.id])

  const handleLike = () => {
    if (!post) return
    
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    let updatedLikedPosts
    
    if (isLiked) {
      // Unlike
      updatedLikedPosts = likedPosts.filter((id: string) => id !== post.id)
      setIsLiked(false)
    } else {
      // Like
      updatedLikedPosts = [...likedPosts, post.id]
      setIsLiked(true)
    }
    
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts))
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && post) {
      // For demo purposes, just show success message
      console.log('New comment:', newComment)
      setNewComment('')
      // In a real app, this would update the post's comments
    }
  }

  const handleShare = () => {
    if (post) {
      navigator.clipboard.writeText(window.location.href)
      // Could add a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href="/feed" className="text-primary-600 hover:text-primary-700">
            Return to feed
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Post Details</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Post Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center space-x-4">
              <Image
                src={post.userAvatar}
                alt={post.username}
                width={60}
                height={60}
                className="rounded-full"
                onError={(e) => {
                  // Fallback to a default avatar if the original fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                }}
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{post.username}</h2>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Image - Large and Clear */}
          <div className="relative">
            <Image
              src={post.imageUrl}
              alt="Object"
              width={800}
              height={800}
              className="w-full h-96 md:h-[500px] object-cover"
              priority
              onError={(e) => {
                // Fallback to a placeholder image if the original fails to load
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop';
              }}
            />
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 rounded-full text-lg font-medium ${moodColors[post.mood]} backdrop-blur-sm`}>
                {moodEmojis[post.mood]} {post.mood}
              </span>
            </div>
          </div>

          {/* Post Actions */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <motion.button
                  onClick={handleLike}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                    isLiked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-semibold text-lg">{post.likes.length + (isLiked && !post.likes.includes('demo_user') ? 1 : 0)}</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-7 h-7" />
                  <span className="font-semibold text-lg">{post.comments.length}</span>
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="p-3 rounded-xl text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-7 h-7" />
                </motion.button>
              </div>
            </div>

            {/* Story - Larger Text */}
            <div className="mb-8">
              <p className="text-lg text-gray-900 leading-relaxed">{post.story}</p>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>
              
              {/* Existing Comments */}
              <div className="space-y-4 mb-6">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-gray-900">{comment.username}</span>
                          <span className="text-sm text-gray-500">
                            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <form onSubmit={handleComment} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                </div>
                <div className="flex-1 flex space-x-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
