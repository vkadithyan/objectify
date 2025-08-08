'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, MoreHorizontal, Clock } from 'lucide-react'
import { Post } from '@/types/post'
import { formatDistanceToNow } from 'date-fns'

// Safe date formatting function to handle invalid dates
const formatTimeAgo = (dateValue: string | Date) => {
  try {
    const date = new Date(dateValue)
    if (isNaN(date.getTime())) {
      return 'just now'
    }
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    return 'just now'
  }
}

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  isLiked: boolean
}

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

export default function PostCard({ post, onLike, isLiked }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    onLike(post.id)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // TODO: Implement comment submission
      console.log('New comment:', newComment)
      setNewComment('')
    }
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
  }

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ 
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={post.userAvatar}
              alt={post.username}
              width={40}
              height={40}
              className="rounded-full"
              onError={(e) => {
                // Fallback to a default avatar if the original fails to load
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
              }}
            />
            <div>
              <h3 className="font-semibold text-gray-900">{post.username}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Post Image - Clickable and Clear */}
      <Link href={`/post/${post.id}`} className="block relative cursor-pointer group overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={post.imageUrl}
            alt="Object"
            width={600}
            height={600}
            className="w-full h-80 object-cover transition-all duration-500 ease-out group-hover:brightness-110"
            priority
            onError={(e) => {
              // Fallback to a placeholder image if the original fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop';
            }}
          />
        </motion.div>
        <motion.div 
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${moodColors[post.mood]} backdrop-blur-sm shadow-lg`}>
            {moodEmojis[post.mood]} {post.mood}
          </span>
        </motion.div>
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl"
            initial={{ scale: 0.8, y: 10 }}
            whileHover={{ scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold text-gray-800">View Details</span>
          </motion.div>
        </motion.div>
      </Link>

      {/* Post Actions */}
      <div className="p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleLike}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                isLiked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              }`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{post.likes.length}</span>
            </motion.button>

            <motion.button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="font-medium">{post.comments.length}</span>
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="p-2 rounded-lg text-gray-500 hover:text-green-500 hover:bg-green-50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Story */}
        <div className="mb-4">
          <p className="text-gray-900 leading-relaxed">{post.story}</p>
        </div>

        {/* Comments Section */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-4"
          >
            {/* Existing Comments */}
            <div className="space-y-3 mb-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.username}</span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleComment} className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
