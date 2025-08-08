const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

console.log('🧪 Testing MongoDB Atlas Connection...');
console.log('=====================================\n');

const testConnection = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log('❌ No MONGODB_URI found in environment variables');
      console.log('📝 Please add MONGODB_URI to your backend/.env file');
      console.log('💡 Example: MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/objectify?retryWrites=true&w=majority\n');
      return;
    }
    
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    console.log(`📍 URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}\n`); // Hide credentials in log
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ MongoDB Atlas connection successful!');
    console.log(`🏠 Connected to: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection state: ${conn.connection.readyState === 1 ? 'Connected' : 'Not Connected'}\n`);
    
    // Test basic operations
    console.log('🧪 Testing basic database operations...');
    
    // Create a test collection
    const testCollection = conn.connection.db.collection('connection_test');
    
    // Insert a test document
    const testDoc = { 
      message: 'MongoDB Atlas connection test', 
      timestamp: new Date(),
      app: 'Objectify'
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Test document inserted successfully');
    console.log(`📄 Document ID: ${insertResult.insertedId}`);
    
    // Read the test document
    const foundDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Test document retrieved successfully');
    
    // Clean up - delete test document
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Test document cleaned up');
    
    console.log('\n🎉 All tests passed! Your MongoDB Atlas connection is working perfectly.');
    console.log('🚀 Your Objectify app is ready to use persistent database storage.\n');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(`   Error: ${error.message}\n`);
    
    if (error.message.includes('authentication failed')) {
      console.log('🔐 Authentication Error Solutions:');
      console.log('   1. Check your username and password in the connection string');
      console.log('   2. Ensure the database user exists in MongoDB Atlas');
      console.log('   3. Verify the user has "Read and write to any database" permissions\n');
    } else if (error.message.includes('connection') || error.message.includes('timeout')) {
      console.log('🌐 Connection Error Solutions:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify Network Access settings in MongoDB Atlas');
      console.log('   3. Ensure your IP address is whitelisted (or use 0.0.0.0/0 for development)');
      console.log('   4. Check if your firewall is blocking the connection\n');
    } else if (error.message.includes('URI')) {
      console.log('🔗 URI Error Solutions:');
      console.log('   1. Check the format of your MONGODB_URI');
      console.log('   2. Ensure it includes the database name at the end');
      console.log('   3. Verify special characters in password are URL-encoded\n');
    }
    
    console.log('📚 For more help, check MONGODB_ATLAS_SETUP.md');
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
    }
  }
};

// Run the test
testConnection();
