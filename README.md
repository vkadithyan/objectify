# 🎭 Objectify - Bring Your Objects to Life

A modern social media platform where users can upload objects and watch as AI creates magical, unique backstories for them. Share your object's personality with the world!

## ✨ Features

- **🤖 AI-Powered Storytelling**: Advanced AI generates unique backstories for any object
- **📸 Easy Image Upload**: Drag & drop or click to upload object photos
- **😊 Mood Selection**: Choose from 8 different moods (happy, sad, excited, peaceful, etc.)
- **💬 Social Features**: Like, comment, and share object stories
- **👥 User Profiles**: Create profiles and manage your object collection
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **⚡ Real-time Updates**: Instant likes and comments
- **🔒 Secure Authentication**: JWT-based authentication with password hashing

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Next.js 14** for routing and SSR
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Dropzone** for file uploads
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **OpenAI API** for story generation
- **Cloudinary** for image storage
- **Multer** for file handling
- **Express Validator** for input validation

### Infrastructure
- **Vercel** (Frontend hosting)
- **Render/Railway** (Backend hosting)
- **MongoDB Atlas** (Database)
- **Cloudinary** (Image CDN)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- OpenAI API key
- Cloudinary account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/objectify.git
cd objectify
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Edit .env with your credentials
nano .env

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 4. Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/objectify

# JWT
JWT_SECRET=your-super-secret-jwt-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Posts
- `GET /api/posts` - Get all posts (feed)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:id` - Delete post

### AI
- `POST /api/ai/generate-story` - Generate AI story
- `POST /api/ai/analyze-object` - Analyze object in image
- `POST /api/ai/suggest-mood` - Suggest mood for object

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary
- `DELETE /api/upload/image/:publicId` - Delete image
- `POST /api/upload/optimize` - Optimize image URL

## 🎨 UI Components

### Pages
- **Landing Page** (`/`) - Beautiful hero section with features
- **Sign Up** (`/signup`) - User registration with social login
- **Login** (`/login`) - User authentication
- **Feed** (`/feed`) - Main social feed with posts
- **Create Post** (`/create`) - Multi-step post creation wizard
- **Profile** (`/profile/:username`) - User profiles and posts

### Components
- `PostCard` - Individual post display with interactions
- `ImageUpload` - Drag & drop image upload
- `MoodSelector` - Interactive mood selection
- `CommentSection` - Comments with real-time updates

## 🔧 Development

### Project Structure
```
objectify/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable components
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── backend/                # Express.js API
│   ├── config/             # Database config
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── server.js           # Main server file
├── types/                  # TypeScript types
└── README.md
```

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Database (MongoDB Atlas)
1. Create a free cluster
2. Get connection string
3. Add to environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 Vision API
- Cloudinary for image hosting
- Unsplash for sample images
- The React and Next.js communities

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@objectify.com

---

Made with ❤️ by the Objectify Team
