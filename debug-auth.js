// Debug script to test authentication flow
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testAuth() {
  console.log('🔍 Testing Authentication Flow');
  console.log('==============================\n');

  try {
    // Test 1: Register a test user
    console.log('📝 Step 1: Testing user registration...');
    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser_' + Date.now(),
        email: `test${Date.now()}@example.com`,
        password: 'testpassword123'
      })
    });

    if (!registerResponse.ok) {
      const registerError = await registerResponse.text();
      console.log('❌ Registration failed:', registerError);
      return;
    }

    const registerData = await registerResponse.json();
    console.log('✅ Registration successful');
    console.log('   Token received:', registerData.token ? 'Yes' : 'No');
    
    const token = registerData.token;
    
    if (!token) {
      console.log('❌ No token received from registration');
      return;
    }

    // Test 2: Test protected route (create post)
    console.log('\n📝 Step 2: Testing protected route (create post)...');
    const postResponse = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600',
        mood: 'happy',
        story: 'This is a test story for debugging authentication.'
      })
    });

    if (!postResponse.ok) {
      const postError = await postResponse.text();
      console.log('❌ Post creation failed:', postError);
      return;
    }

    const postData = await postResponse.json();
    console.log('✅ Post creation successful');
    console.log('   Post ID:', postData._id);

    // Test 3: Test getting posts
    console.log('\n📝 Step 3: Testing get posts...');
    const getPostsResponse = await fetch(`${API_BASE}/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!getPostsResponse.ok) {
      const getPostsError = await getPostsResponse.text();
      console.log('❌ Get posts failed:', getPostsError);
      return;
    }

    const postsData = await getPostsResponse.json();
    console.log('✅ Get posts successful');
    console.log('   Number of posts:', postsData.length);

    console.log('\n🎉 All authentication tests passed!');
    console.log('💡 The backend authentication is working correctly.');
    console.log('🔍 The issue is likely in the frontend token storage/retrieval.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔍 Possible issues:');
    console.log('   • Backend server not running on port 5000');
    console.log('   • Database connection issues');
    console.log('   • JWT_SECRET not configured');
    console.log('   • CORS issues');
  }
}

// Run the test
testAuth();
