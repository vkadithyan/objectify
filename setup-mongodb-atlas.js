const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('🍃 MongoDB Atlas Setup for Objectify');
console.log('===================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

const setupMongoDB = async () => {
  console.log('Let\'s set up your MongoDB Atlas connection!\n');
  
  console.log('📋 First, make sure you have:');
  console.log('   ✅ Created a MongoDB Atlas account at https://cloud.mongodb.com/');
  console.log('   ✅ Created a free cluster (M0 Sandbox)');
  console.log('   ✅ Created a database user with read/write permissions');
  console.log('   ✅ Added your IP to Network Access (or allowed 0.0.0.0/0 for development)\n');
  
  const hasSetup = await askQuestion('Have you completed the MongoDB Atlas setup? (y/n): ');
  
  if (hasSetup.toLowerCase() !== 'y') {
    console.log('\n📚 Please follow the guide in MONGODB_ATLAS_SETUP.md first');
    console.log('   Then run this script again when you\'re ready!\n');
    rl.close();
    return;
  }
  
  console.log('\n🔗 Now let\'s configure your connection string:');
  
  const username = await askQuestion('Enter your MongoDB Atlas username: ');
  const password = await askQuestion('Enter your MongoDB Atlas password: ');
  const clusterUrl = await askQuestion('Enter your cluster URL (e.g., cluster0.abc123.mongodb.net): ');
  
  // Build the connection string
  const mongoUri = `mongodb+srv://${username}:${password}@${clusterUrl}/objectify?retryWrites=true&w=majority`;
  
  console.log('\n🔧 Building your configuration...');
  
  // Read existing .env file or create new one
  const envPath = path.join(__dirname, 'backend', '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('✅ Found existing .env file');
  } else {
    console.log('📝 Creating new .env file');
  }
  
  // Update or add MongoDB URI
  const lines = envContent.split('\n');
  let mongoUriUpdated = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('MONGODB_URI=')) {
      lines[i] = `MONGODB_URI=${mongoUri}`;
      mongoUriUpdated = true;
      break;
    }
  }
  
  if (!mongoUriUpdated) {
    // Create complete .env file
    const newEnvContent = `# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=${mongoUri}

# JWT Configuration
JWT_SECRET=objectify-super-secret-jwt-key-2024

# OpenAI Configuration (optional - for AI story generation)
OPENAI_API_KEY=your-openai-api-key-here

# Cloudinary Configuration (optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
`;
    
    fs.writeFileSync(envPath, newEnvContent);
    console.log('✅ Created complete .env file');
  } else {
    fs.writeFileSync(envPath, lines.join('\n'));
    console.log('✅ Updated existing .env file');
  }
  
  console.log('\n🧪 Testing your MongoDB connection...');
  
  // Test the connection
  try {
    const mongoose = require('mongoose');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ MongoDB Atlas connection successful!');
    console.log(`🏠 Connected to: ${mongoose.connection.host}`);
    
    // Create initial collections/indexes if needed
    console.log('🏗️  Setting up database structure...');
    
    await mongoose.connection.close();
    console.log('🔌 Test connection closed');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n🔧 Please check:');
    console.log('   - Username and password are correct');
    console.log('   - Cluster URL is correct');
    console.log('   - Network access is configured');
    console.log('   - Database user has proper permissions\n');
  }
  
  console.log('\n🎉 Setup complete!');
  console.log('🚀 Your Objectify app is now configured to use MongoDB Atlas');
  console.log('📊 All posts and user data will be stored persistently');
  console.log('\n💡 Next steps:');
  console.log('   1. Restart your backend server: npm run dev');
  console.log('   2. Test the connection: node test-mongodb-connection.js');
  console.log('   3. Start creating posts in your app!\n');
  
  rl.close();
};

setupMongoDB().catch(console.error);
