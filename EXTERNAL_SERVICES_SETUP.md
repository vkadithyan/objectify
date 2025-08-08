# 🌐 External Services Setup - Complete Guide

## 🎯 Overview

Your Objectify application needs three external services to function properly:
1. **MongoDB Atlas** - Database for storing user data and posts
2. **OpenAI API** - AI-powered story generation
3. **Cloudinary** - Image upload and storage

## ✅ What's Already Done

- ✅ JWT secret generated automatically
- ✅ .env file created in backend directory
- ✅ All dependencies installed
- ✅ Frontend and backend servers ready

## 🚀 Quick Start (30 minutes)

### Step 1: Set Up MongoDB Atlas (10 minutes)
1. Follow the detailed guide in `MONGODB_SETUP.md`
2. Create free account at https://www.mongodb.com/atlas
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env`

### Step 2: Get OpenAI API Key (10 minutes)
1. Follow the detailed guide in `OPENAI_SETUP.md`
2. Create account at https://platform.openai.com/
3. Add payment method (required, but free credits available)
4. Generate API key
5. Update `OPENAI_API_KEY` in `backend/.env`

### Step 3: Set Up Cloudinary (10 minutes)
1. Follow the detailed guide in `CLOUDINARY_SETUP.md`
2. Create free account at https://cloudinary.com/users/register/free
3. Get your credentials (Cloud Name, API Key, API Secret)
4. Update Cloudinary values in `backend/.env`

## 📋 Your .env File Should Look Like This

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3001

# MongoDB Configuration
MONGODB_URI=mongodb+srv://objectify_user:your_password@cluster0.xxxxx.mongodb.net/objectify?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-generated-jwt-secret-here

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎉 Start Your Application

Once all services are configured:

```bash
# Option 1: Use the quick start script
.\quick-start.ps1

# Option 2: Manual start
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm run dev
```

## 🌐 Access Your App

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 💰 Cost Breakdown

| Service | Cost | Free Tier |
|---------|------|-----------|
| MongoDB Atlas | $0/month | 512MB storage, shared cluster |
| OpenAI API | ~$0.01-0.03 per image | $5 free credits for new users |
| Cloudinary | $0/month | 25GB storage, 25GB bandwidth |

**Total estimated cost: $0-5/month** (mostly free!)

## 🔍 Testing Your Setup

1. **Check Backend Health**: Visit http://localhost:5000/health
2. **Test MongoDB**: Backend will log connection status
3. **Test OpenAI**: Try uploading an image to generate a story
4. **Test Cloudinary**: Try uploading an image

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string format
   - Ensure IP is whitelisted in Atlas
   - Verify username/password

2. **OpenAI API Error**
   - Check API key format (starts with `sk-`)
   - Verify you have credits
   - Check rate limits

3. **Cloudinary Upload Error**
   - Verify all three credentials
   - Check file size (5MB limit)
   - Ensure file format is supported

### Get Help

- Run `node setup.js` to check your current status
- Check the individual setup guides for detailed instructions
- Verify your .env file has all required values

## 🎯 Next Steps

After setting up external services:

1. **Test the application** by visiting http://localhost:3001
2. **Create a user account** through the registration form
3. **Upload an image** to test AI story generation
4. **Explore the features** like liking, commenting, and sharing

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Objectify Implementation Guide](IMPLEMENTATION_GUIDE.md)
