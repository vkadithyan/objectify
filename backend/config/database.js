const mongoose = require('mongoose');

// In-memory storage for when MongoDB is not available
let inMemoryPosts = [
  {
    _id: '507f1f77bcf86cd799439011',
    userId: '507f1f77bcf86cd799439012',
    username: 'creative_soul',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop',
    mood: 'happy',
    story: 'Meet Luna, my trusty coffee mug! She\'s been with me through countless late-night coding sessions and early morning meetings. Today she\'s feeling particularly cheerful, probably because I finally remembered to clean her properly. She says the warm water felt like a spa day! ☕✨',
    likes: [],
    comments: [],
    createdAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    userId: '507f1f77bcf86cd799439014',
    username: 'art_collector',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This old typewriter has seen generations of stories unfold. Its keys have danced across countless pages, bringing characters to life and worlds into existence. Today it sits quietly, contemplating its next masterpiece. The gentle click-clack of its memories echo through time...',
    likes: [],
    comments: [],
    createdAt: new Date('2024-01-14T15:45:00Z')
  },
  {
    _id: '507f1f77bcf86cd799439015',
    userId: '507f1f77bcf86cd799439016',
    username: 'plant_parent',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'Fernando the fern is having a zen moment today. He\'s been practicing his breathing exercises (photosynthesis) and feeling particularly connected to nature. His leaves are reaching toward the sunlight like tiny green hands saying "thank you" to the universe. 🌿✨',
    likes: [],
    comments: [],
    createdAt: new Date('2024-01-13T09:15:00Z')
  }
];

let isMongoConnected = false;

const connectDB = async () => {
  try {
    // Try to connect to MongoDB Atlas using environment variable
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 8000, // Timeout after 8s
      socketTimeoutMS: 45000,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    isMongoConnected = true;
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isMongoConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
      isMongoConnected = false;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      if (isMongoConnected) {
        await mongoose.connection.close();
        console.log('📦 MongoDB connection closed through app termination');
      }
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💾 Using in-memory storage for posts');
    console.log('🚀 Server will continue with full functionality using memory storage');
    isMongoConnected = false;
  }
};

// Export helper functions for in-memory storage
const getInMemoryPosts = () => inMemoryPosts;
const addInMemoryPost = (post) => {
  const newPost = {
    ...post,
    _id: new Date().getTime().toString(),
    createdAt: new Date()
  };
  inMemoryPosts.unshift(newPost);
  return newPost;
};
const updateInMemoryPostLikes = (postId, likes) => {
  const post = inMemoryPosts.find(p => p._id === postId);
  if (post) {
    post.likes = likes;
  }
  return post;
};

module.exports = { 
  connectDB, 
  isMongoConnected: () => isMongoConnected,
  getInMemoryPosts,
  addInMemoryPost,
  updateInMemoryPostLikes
};
