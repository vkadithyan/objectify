# 🍃 MongoDB Atlas Setup Guide for Objectify

Follow these steps to set up your own MongoDB Atlas cluster and connect it to your Objectify application.

## Step 1: Create MongoDB Atlas Account

1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Click "Try Free" or "Sign Up"
3. Create your account with email/password or sign up with Google

## Step 2: Create a New Cluster

1. After logging in, click "Build a Database"
2. Choose **"M0 Sandbox"** (Free tier - perfect for development)
3. Select your preferred cloud provider and region (AWS, Google Cloud, or Azure)
4. Give your cluster a name (e.g., "objectify-cluster")
5. Click "Create Cluster" (this takes 1-3 minutes)

## Step 3: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username (e.g., "objectify-user")
5. Generate a secure password (save this!)
6. Under "Database User Privileges", select "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, restrict to specific IPs
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string (it looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your Environment File

Replace `<username>` and `<password>` in the connection string with your actual credentials, and add the database name:

```env
MONGODB_URI=mongodb+srv://objectify-user:your-password@cluster0.xxxxx.mongodb.net/objectify?retryWrites=true&w=majority
```

## Step 7: Test Connection

Run the setup script to test your connection:
```bash
node test-mongodb-connection.js
```

## 🎉 That's it!

Your Objectify app will now use your personal MongoDB Atlas cluster for:
- ✅ Persistent post storage
- ✅ User authentication
- ✅ Real-time data
- ✅ Reliable cloud hosting

## 🔒 Security Tips

- Keep your database credentials secure
- Don't commit `.env` files to version control
- Use IP whitelisting in production
- Regularly rotate passwords

## 📊 Free Tier Limits

MongoDB Atlas free tier includes:
- 512 MB storage
- Shared RAM and vCPU
- No time limit
- Perfect for development and small projects
