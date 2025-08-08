# 🚀 Objectify Implementation Guide

## ✅ What's Already Done

- ✅ Frontend dependencies installed (Next.js, React, TypeScript, Tailwind CSS)
- ✅ Backend dependencies installed (Express, MongoDB, OpenAI, Cloudinary)
- ✅ Frontend server running on http://localhost:3001
- ✅ Next.js configuration fixed (removed deprecated appDir option)

## 🔧 Required Setup

### 1. Create Backend Environment File

Create a file named `.env` in the `backend` directory with the following content:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3001

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/objectify

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Install MongoDB

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and start the MongoDB service

**Option B: MongoDB Atlas (Recommended)**
- Go to: https://www.mongodb.com/atlas
- Create a free account
- Create a new cluster
- Get your connection string and replace `MONGODB_URI` in the .env file

### 3. Get OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Replace `OPENAI_API_KEY` in the .env file

### 4. Set Up Cloudinary

1. Go to: https://cloudinary.com/users/register/free
2. Create a free account
3. Go to Dashboard → API Keys
4. Copy your Cloud Name, API Key, and API Secret
5. Replace the Cloudinary values in the .env file

### 5. Generate JWT Secret

Replace `JWT_SECRET` with a secure random string. You can generate one using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🚀 Starting the Application

### Start Backend Server
```bash
cd backend
npm run dev
```

### Start Frontend Server (in a new terminal)
```bash
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### AI Features
- `POST /api/ai/generate-story` - Generate AI story for object

### File Upload
- `POST /api/upload/image` - Upload image to Cloudinary
- `DELETE /api/upload/image/:publicId` - Delete image

## 🔍 Testing the Setup

1. **Check Backend Health**: Visit http://localhost:5000/health
2. **Check Frontend**: Visit http://localhost:3001
3. **Test API**: Use tools like Postman or curl to test endpoints

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - For Atlas, ensure IP is whitelisted

2. **OpenAI API Error**
   - Verify API key is correct
   - Check API key has sufficient credits
   - Ensure API key has proper permissions

3. **Cloudinary Upload Error**
   - Verify Cloudinary credentials
   - Check file size limits (5MB max)
   - Ensure file format is supported

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill processes using the port
   - Use `netstat -ano | findstr :5000` to find processes

### Development Commands

```bash
# Check setup status
node setup.js

# Install dependencies
npm install
cd backend && npm install

# Run development servers
npm run dev          # Frontend
cd backend && npm run dev  # Backend

# Build for production
npm run build
cd backend && npm start
```

## 📱 Features

- **AI-Powered Story Generation**: Upload images and get creative stories
- **User Authentication**: Secure login/register system
- **Image Upload**: Cloudinary integration for image storage
- **Social Features**: Like, comment, and share object stories
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Live notifications and updates

## 🔒 Security Features

- JWT authentication
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers
- File upload restrictions

## 🎨 UI/UX Features

- Modern, responsive design
- Dark/light mode support
- Smooth animations with Framer Motion
- Toast notifications
- Drag & drop image upload
- Loading states and error handling
