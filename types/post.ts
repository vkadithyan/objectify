export interface Comment {
  id: string
  userId: string
  username: string
  text: string
  createdAt: Date
}

export interface Post {
  id: string
  userId: string
  username: string
  userAvatar: string
  imageUrl: string
  mood: string
  story: string
  likes: string[]
  comments: Comment[]
  createdAt: Date
}

export interface CreatePostData {
  imageUrl: string
  mood: string
  story: string
}

export type Mood = 'happy' | 'sad' | 'excited' | 'peaceful' | 'contemplative' | 'energetic' | 'calm' | 'curious'
