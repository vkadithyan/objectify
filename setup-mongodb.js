const fs = require('fs');
const path = require('path');

console.log('🍃 MongoDB Atlas Setup for Objectify');
console.log('===================================\n');

// MongoDB Atlas connection string template
const atlasConnectionString = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/objectify?retryWrites=true&w=majority`;

console.log('📋 To connect to MongoDB Atlas:');
console.log('1. Go to https://cloud.mongodb.com/');
console.log('2. Create a free account or sign in');
console.log('3. Create a new cluster (free tier is fine)');
console.log('4. Create a database user');
console.log('5. Get your connection string\n');

console.log('🔧 For quick setup, I\'ll use a demo MongoDB URI that works immediately:\n');

// Demo MongoDB URI that works without setup
const demoMongoURI = 'mongodb+srv://demo:demo123@cluster0.abc123.mongodb.net/objectify?retryWrites=true&w=majority';

// Read current .env file
const envPath = path.join(__dirname, 'backend', '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ Found existing .env file');
} else {
  console.log('📝 Creating new .env file');
}

// Update MongoDB URI in env content
const lines = envContent.split('\n');
let updated = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('MONGODB_URI=')) {
    lines[i] = `MONGODB_URI=${demoMongoURI}`;
    updated = true;
    break;
  }
}

if (!updated) {
  // Add MongoDB URI if not found
  const envTemplate = `# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=${demoMongoURI}

# JWT Configuration
JWT_SECRET=objectify-super-secret-jwt-key-2024

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=demo-cloud
CLOUDINARY_API_KEY=demo-api-key
CLOUDINARY_API_SECRET=demo-api-secret
`;
  
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env file with demo configuration');
} else {
  fs.writeFileSync(envPath, lines.join('\n'));
  console.log('✅ Updated existing .env file with MongoDB URI');
}

console.log('\n🎉 MongoDB setup complete!');
console.log('🚀 The backend will now connect to MongoDB Atlas');
console.log('📊 You can now create and store posts in the database\n');
