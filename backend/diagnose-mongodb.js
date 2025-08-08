const mongoose = require('mongoose');
const { URL } = require('url');
require('dotenv').config();

console.log('🔍 MongoDB Atlas Connection Diagnostic Tool');
console.log('==========================================\n');

const diagnoseConnection = async () => {
  const mongoUri = process.env.MONGODB_URI;
  
  console.log('📋 STEP 1: Environment Variable Check');
  console.log('=====================================');
  
  if (!mongoUri) {
    console.log('❌ MONGODB_URI not found in environment variables');
    console.log('💡 Solution: Add MONGODB_URI to your .env file\n');
    return;
  }
  
  console.log('✅ MONGODB_URI found in environment');
  
  // Parse and validate URI format
  console.log('\n📋 STEP 2: URI Format Validation');
  console.log('=================================');
  
  try {
    const parsedUri = new URL(mongoUri);
    console.log('✅ URI format is valid');
    console.log(`   Protocol: ${parsedUri.protocol}`);
    console.log(`   Host: ${parsedUri.hostname}`);
    console.log(`   Database: ${parsedUri.pathname.substring(1) || 'Not specified'}`);
    
    // Check for common issues
    if (!parsedUri.protocol.startsWith('mongodb')) {
      console.log('⚠️  Warning: Protocol should be mongodb:// or mongodb+srv://');
    }
    
    if (!parsedUri.hostname.includes('mongodb.net')) {
      console.log('⚠️  Warning: Hostname doesn\'t appear to be MongoDB Atlas');
    }
    
    if (!parsedUri.pathname || parsedUri.pathname === '/') {
      console.log('⚠️  Warning: No database name specified in URI');
    }
    
  } catch (error) {
    console.log('❌ Invalid URI format');
    console.log(`   Error: ${error.message}`);
    console.log('💡 Expected format: mongodb+srv://username:password@cluster.mongodb.net/database\n');
    return;
  }
  
  console.log('\n📋 STEP 3: Connection Test');
  console.log('==========================');
  
  try {
    console.log('🔄 Attempting connection...');
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 second timeout
      connectTimeoutMS: 15000,
      socketTimeoutMS: 15000,
    });
    
    console.log('✅ Connection successful!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState}`);
    
    // Test basic operations
    console.log('\n📋 STEP 4: Database Operations Test');
    console.log('===================================');
    
    const testCollection = conn.connection.db.collection('diagnostic_test');
    
    // Insert test
    const testDoc = { 
      test: 'MongoDB Atlas connection diagnostic',
      timestamp: new Date(),
      success: true
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Insert operation successful');
    
    // Read test
    const foundDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Read operation successful');
    
    // Update test
    await testCollection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { updated: true } }
    );
    console.log('✅ Update operation successful');
    
    // Delete test
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Delete operation successful');
    
    console.log('\n🎉 All tests passed! MongoDB Atlas is working perfectly.');
    
  } catch (error) {
    console.log('❌ Connection failed');
    console.log(`   Error: ${error.message}\n`);
    
    // Detailed error analysis
    console.log('🔍 ERROR ANALYSIS:');
    console.log('==================');
    
    if (error.message.includes('authentication failed') || error.message.includes('auth')) {
      console.log('🔐 AUTHENTICATION ERROR');
      console.log('   Possible causes:');
      console.log('   • Username or password is incorrect');
      console.log('   • Special characters in password need URL encoding');
      console.log('   • Database user doesn\'t exist');
      console.log('   • User doesn\'t have proper permissions');
      console.log('\n   Solutions:');
      console.log('   1. Double-check username/password in MongoDB Atlas');
      console.log('   2. Ensure user has "Read and write to any database" role');
      console.log('   3. URL-encode special characters in password');
      console.log('      Example: p@ssw0rd becomes p%40ssw0rd');
      
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('🌐 DNS/NETWORK ERROR');
      console.log('   Possible causes:');
      console.log('   • Internet connection issues');
      console.log('   • Incorrect cluster URL');
      console.log('   • DNS resolution problems');
      console.log('\n   Solutions:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify cluster URL in MongoDB Atlas dashboard');
      console.log('   3. Try using a different network/DNS');
      
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      console.log('⏱️  CONNECTION TIMEOUT');
      console.log('   Possible causes:');
      console.log('   • Network access not configured');
      console.log('   • Firewall blocking connection');
      console.log('   • Slow internet connection');
      console.log('\n   Solutions:');
      console.log('   1. Add 0.0.0.0/0 to Network Access in MongoDB Atlas');
      console.log('   2. Check firewall settings');
      console.log('   3. Try from a different network');
      
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('🚫 CONNECTION REFUSED');
      console.log('   Possible causes:');
      console.log('   • Wrong port or protocol');
      console.log('   • Cluster is paused or deleted');
      console.log('\n   Solutions:');
      console.log('   1. Use mongodb+srv:// protocol for Atlas');
      console.log('   2. Check cluster status in MongoDB Atlas');
      
    } else {
      console.log('❓ UNKNOWN ERROR');
      console.log('   Please check:');
      console.log('   1. MongoDB Atlas cluster is running');
      console.log('   2. Network access is configured');
      console.log('   3. Database user exists and has permissions');
      console.log('   4. Connection string format is correct');
    }
    
    console.log('\n📚 For more help:');
    console.log('   • MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/');
    console.log('   • Connection Troubleshooting: https://docs.atlas.mongodb.com/troubleshoot-connection/');
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('\n🔌 Connection closed');
    }
  }
};

// Run diagnostic
diagnoseConnection().catch(console.error);
