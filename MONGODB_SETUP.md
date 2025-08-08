# 🗄️ MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**: https://www.mongodb.com/atlas
2. **Click "Try Free"** or "Get Started Free"
3. **Fill in your details**:
   - Email address
   - Password
   - Account name (e.g., "Objectify Project")

## Step 2: Create a Cluster

1. **Choose "FREE" tier** (M0 Sandbox)
2. **Select Cloud Provider**: Choose AWS, Google Cloud, or Azure (any is fine)
3. **Select Region**: Choose closest to your location
4. **Click "Create"**

## Step 3: Set Up Database Access

1. **Go to "Database Access"** in the left sidebar
2. **Click "Add New Database User"**
3. **Choose "Password" authentication**
4. **Create username and password**:
   - Username: `objectify_user`
   - Password: Generate a strong password (save this!)
5. **Select "Built-in Role"**: `Read and write to any database`
6. **Click "Add User"**

## Step 4: Set Up Network Access

1. **Go to "Network Access"** in the left sidebar
2. **Click "Add IP Address"**
3. **For development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. **Click "Confirm"**

## Step 5: Get Connection String

1. **Go to "Database"** in the left sidebar
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Copy the connection string**
5. **Replace `<password>` with your database user password**
6. **Replace `<dbname>` with `objectify`**

## Example Connection String:
```
mongodb+srv://objectify_user:your_password@cluster0.xxxxx.mongodb.net/objectify?retryWrites=true&w=majority
```

## Step 6: Update Your .env File

Replace the `MONGODB_URI` in your `backend/.env` file with the connection string from Step 5.

## ✅ Verification

Your MongoDB Atlas setup is complete when:
- ✅ Cluster is created and running
- ✅ Database user is created
- ✅ Network access allows your IP
- ✅ Connection string is updated in .env file
