const fs = require('fs');
const path = require('path');

console.log('🚀 Objectify Setup Script');
console.log('========================\n');

// Check if .env file exists in backend
const envPath = path.join(__dirname, 'backend', '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ Backend .env file not found!');
  console.log('\n📝 Please create a .env file in the backend directory with the following content:\n');
  
  const envTemplate = `# Server Configuration
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
CLOUDINARY_API_SECRET=your-api-secret`;

  console.log(envTemplate);
  console.log('\n⚠️  IMPORTANT: You need to:');
  console.log('1. Install MongoDB or use MongoDB Atlas (cloud)');
  console.log('2. Get an OpenAI API key from https://platform.openai.com/');
  console.log('3. Create a Cloudinary account at https://cloudinary.com/');
  console.log('4. Replace the placeholder values in the .env file');
} else {
  console.log('✅ Backend .env file found');
}

// Check if node_modules exist
const frontendNodeModules = path.join(__dirname, 'node_modules');
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');

if (fs.existsSync(frontendNodeModules)) {
  console.log('✅ Frontend dependencies installed');
} else {
  console.log('❌ Frontend dependencies not installed. Run: npm install');
}

if (fs.existsSync(backendNodeModules)) {
  console.log('✅ Backend dependencies installed');
} else {
  console.log('❌ Backend dependencies not installed. Run: cd backend && npm install');
}

console.log('\n📋 Next Steps:');
console.log('1. Install MongoDB: https://docs.mongodb.com/manual/installation/');
console.log('2. Or use MongoDB Atlas (free tier): https://www.mongodb.com/atlas');
console.log('3. Get OpenAI API key: https://platform.openai.com/api-keys');
console.log('4. Create Cloudinary account: https://cloudinary.com/users/register/free');
console.log('5. Update the .env file with your credentials');
console.log('6. Start the servers: npm run dev (frontend) and cd backend && npm run dev (backend)');

console.log('\n🌐 Your application will be available at:');
console.log('- Frontend: http://localhost:3001');
console.log('- Backend API: http://localhost:5000');
console.log('- Health check: http://localhost:5000/health');
