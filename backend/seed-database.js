const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Post = require('./models/Post');
const User = require('./models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://objectify:objectify123@cluster0.mongodb.net/objectify?retryWrites=true&w=majority';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 Connected to MongoDB for seeding');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Sample posts data
const samplePosts = [
  {
    userId: new mongoose.Types.ObjectId(),
    username: 'creative_soul',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop',
    mood: 'happy',
    story: 'Meet Luna, my trusty coffee mug! She\'s been with me through countless late-night coding sessions and early morning meetings. Today she\'s feeling particularly cheerful, probably because I finally remembered to clean her properly. She says the warm water felt like a spa day! ☕✨',
    likes: [],
    comments: [],
  },
  {
    userId: new mongoose.Types.ObjectId(),
    username: 'art_collector',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This old typewriter has seen generations of stories unfold. Its keys have danced across countless pages, bringing characters to life and worlds into existence. Today it sits quietly, contemplating its next masterpiece. The gentle click-clack of its memories echo through time...',
    likes: [],
    comments: [],
  },
  {
    userId: new mongoose.Types.ObjectId(),
    username: 'plant_parent',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'Fernando the fern is having a zen moment today. He\'s been practicing his breathing exercises (photosynthesis) and feeling particularly connected to nature. His leaves are reaching toward the sunlight like tiny green hands saying "thank you" to the universe. 🌿✨',
    likes: [],
    comments: [],
  },
  {
    userId: new mongoose.Types.ObjectId(),
    username: 'tech_enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop',
    mood: 'excited',
    story: 'This smartphone is absolutely buzzing with excitement! It just got a new software update and can\'t wait to show off all its new features. "Look at my new camera filters!" it seems to say, practically vibrating with digital joy. Technology has never been more enthusiastic! 📱⚡',
    likes: [],
    comments: [],
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing posts
    await Post.deleteMany({});
    console.log('🧹 Cleared existing posts');
    
    // Insert sample posts
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`✅ Created ${createdPosts.length} sample posts`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Your feed will now show default posts');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();
