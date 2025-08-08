'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Plus, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { Post } from '@/types/post'

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'creative_soul',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop',
    mood: 'happy',
    story: 'Meet Luna, my trusty coffee mug! She\'s been with me through countless late-night coding sessions and early morning meetings. Today she\'s feeling particularly cheerful, probably because I finally remembered to clean her properly. She says the warm water felt like a spa day! ☕✨',
    likes: ['user2', 'user3', 'user4'],
    comments: [
      { id: '1', userId: 'user2', username: 'coffee_lover', text: 'Luna is absolutely adorable! ☕', createdAt: new Date() },
      { id: '2', userId: 'user3', username: 'dev_mike', text: 'I have a similar relationship with my keyboard 😄', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    userId: 'user2',
    username: 'art_collector',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This old typewriter has seen generations of stories unfold. Its keys have danced across countless pages, bringing characters to life and worlds into existence. Today it sits quietly, contemplating its next masterpiece. The gentle click-clack of its memories echo through time...',
    likes: ['user1', 'user3'],
    comments: [
      { id: '3', userId: 'user1', username: 'creative_soul', text: 'So poetic! I can almost hear the stories it wants to tell', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-14T15:45:00Z')
  },
  {
    id: '3',
    userId: 'user3',
    username: 'plant_parent',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'Fernando the fern is having a zen moment today. He\'s been practicing his breathing exercises (photosynthesis) and feeling particularly connected to nature. His leaves are reaching toward the sunlight like tiny green hands saying "thank you" to the universe. 🌿✨',
    likes: ['user1', 'user2', 'user4', 'user5'],
    comments: [
      { id: '4', userId: 'user4', username: 'nature_lover', text: 'Fernando is goals! I need to learn his zen ways 🌱', createdAt: new Date() },
      { id: '5', userId: 'user5', username: 'green_thumb', text: 'What a beautiful perspective on plant life!', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-13T09:15:00Z')
  }
]

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes.includes('currentUser') 
              ? post.likes.filter(id => id !== 'currentUser')
              : [...post.likes, 'currentUser']
            }
          : post
      )
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Objectify</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/create" className="btn-primary inline-flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Feed Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PostCard 
                post={post} 
                onLike={handleLike}
                isLiked={post.likes.includes('currentUser')}
              />
            </motion.div>
          ))}
        </motion.div>

        {posts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to bring an object to life!</p>
            <Link href="/create" className="btn-primary">
              Create Your First Post
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
