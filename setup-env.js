const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

console.log('🔧 Objectify Environment Setup');
console.log('==============================\n');

// Generate JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Check if .env already exists
const envPath = path.join(__dirname, 'backend', '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  Backend .env file already exists!');
  console.log('If you want to create a new one, please delete the existing file first.\n');
} else {
  // Create .env template
  const envContent = `# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3001

# MongoDB Configuration
# Replace with your MongoDB Atlas connection string
MONGODB_URI=mongodb://localhost:27017/objectify

# JWT Configuration
JWT_SECRET=${jwtSecret}

# OpenAI Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your-openai-api-key-here

# Cloudinary Configuration
# Get your credentials from: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret`;

  try {
    // Ensure backend directory exists
    const backendDir = path.join(__dirname, 'backend');
    if (!fs.existsSync(backendDir)) {
      fs.mkdirSync(backendDir, { recursive: true });
    }

    // Write .env file
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Backend .env file created successfully!');
    console.log(`🔐 JWT Secret generated: ${jwtSecret.substring(0, 20)}...`);
    console.log('\n📝 Next steps:');
    console.log('1. Follow MONGODB_SETUP.md to set up MongoDB Atlas');
    console.log('2. Follow OPENAI_SETUP.md to get your OpenAI API key');
    console.log('3. Follow CLOUDINARY_SETUP.md to get your Cloudinary credentials');
    console.log('4. Update the .env file with your actual credentials');
    console.log('5. Run: .\\quick-start.ps1 to start the application');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}

console.log('\n📋 Setup Checklist:');
console.log('==================');
console.log('□ MongoDB Atlas account created');
console.log('□ MongoDB connection string added to .env');
console.log('□ OpenAI API key obtained and added to .env');
console.log('□ Cloudinary credentials obtained and added to .env');
console.log('□ JWT secret generated (already done)');

console.log('\n🌐 Your application will be available at:');
console.log('- Frontend: http://localhost:3001');
console.log('- Backend API: http://localhost:5000');
console.log('- Health Check: http://localhost:5000/health');

console.log('\n📖 For detailed setup instructions, see:');
console.log('- MONGODB_SETUP.md');
console.log('- OPENAI_SETUP.md');
console.log('- CLOUDINARY_SETUP.md');
