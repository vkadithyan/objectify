# 🔍 MongoDB Atlas Connection Troubleshooting Guide

## Most Common Connection Issues

### 1. 🔐 **Authentication Errors**
**Error Messages:**
- `authentication failed`
- `bad auth`
- `Authentication failed`

**Causes & Solutions:**
- **Wrong Username/Password**: Double-check credentials in MongoDB Atlas
- **Special Characters in Password**: URL-encode special characters
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `$` becomes `%24`
  - `&` becomes `%26`
- **User Doesn't Exist**: Verify user exists in "Database Access"
- **Wrong Permissions**: User needs "Read and write to any database" role

**Example Fix:**
```env
# Wrong (if password contains special characters)
MONGODB_URI=mongodb+srv://user:p@ssw0rd@cluster.mongodb.net/objectify

# Correct
MONGODB_URI=mongodb+srv://user:p%40ssw0rd@cluster.mongodb.net/objectify
```

### 2. 🌐 **Network Access Issues**
**Error Messages:**
- `connection timeout`
- `ETIMEDOUT`
- `server selection timeout`

**Causes & Solutions:**
- **IP Not Whitelisted**: Add your IP to Network Access in MongoDB Atlas
- **Firewall Blocking**: Check corporate/home firewall settings
- **Wrong Network Settings**: For development, use `0.0.0.0/0` (allow all IPs)

**Steps to Fix:**
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 3. 🔗 **Connection String Format Issues**
**Error Messages:**
- `Invalid connection string`
- `URI malformed`
- `ENOTFOUND`

**Common Mistakes:**
```env
# Wrong - missing protocol
MONGODB_URI=user:password@cluster.mongodb.net/objectify

# Wrong - wrong protocol for Atlas
MONGODB_URI=mongodb://user:password@cluster.mongodb.net/objectify

# Wrong - missing database name
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/

# Correct format for MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster0.abc123.mongodb.net/objectify?retryWrites=true&w=majority
```

### 4. 🏗️ **Cluster Issues**
**Error Messages:**
- `ECONNREFUSED`
- `connection refused`
- `server not found`

**Causes & Solutions:**
- **Cluster Paused**: Resume cluster in MongoDB Atlas
- **Cluster Deleted**: Recreate cluster
- **Wrong Cluster URL**: Copy fresh connection string from Atlas
- **Cluster Still Provisioning**: Wait for cluster to finish setup (1-3 minutes)

### 5. 💻 **Environment Configuration Issues**
**Common Problems:**
- `.env` file not in correct location (should be in `backend/` folder)
- Environment variables not loading
- Typos in variable names
- Missing quotes around connection string

**Correct Setup:**
```
objectify/
├── backend/
│   ├── .env          ← Environment file goes here
│   ├── server.js
│   └── ...
├── app/
└── ...
```

## 🧪 **Testing Your Connection**

### Method 1: Use Our Diagnostic Tool
```bash
cd objectify
node diagnose-mongodb.js
```

### Method 2: Manual Test in Backend
```bash
cd backend
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected!'))
  .catch(err => console.log('❌ Failed:', err.message));
"
```

## 🔧 **Step-by-Step Debugging Process**

1. **Check Environment File**
   - Ensure `.env` is in `backend/` folder
   - Verify `MONGODB_URI` variable exists
   - Check for typos in variable name

2. **Validate Connection String**
   - Must start with `mongodb+srv://` for Atlas
   - Include username and password
   - Include cluster URL
   - Include database name
   - URL-encode special characters in password

3. **Verify MongoDB Atlas Settings**
   - Cluster is running (not paused)
   - Database user exists with correct permissions
   - Network access allows your IP (or 0.0.0.0/0 for development)

4. **Test Network Connectivity**
   - Try from different network
   - Check firewall settings
   - Verify internet connection

5. **Check Application Code**
   - Ensure `dotenv` is configured correctly
   - Verify mongoose connection options
   - Check for connection timeout settings

## 🚨 **Emergency Fixes**

### If Nothing Works:
1. **Create New Cluster**: Sometimes starting fresh helps
2. **Use Different Region**: Try a different AWS/Google/Azure region
3. **Check MongoDB Atlas Status**: Visit status.mongodb.com
4. **Use Local MongoDB**: Install MongoDB locally as temporary solution

### Quick Local MongoDB Setup:
```bash
# Install MongoDB Community Server
# Then start local instance
mongod --dbpath ./data/db

# Update .env to use local connection
MONGODB_URI=mongodb://localhost:27017/objectify
```

## 📞 **Getting Help**

If you're still having issues:
1. Run `node diagnose-mongodb.js` and share the output
2. Check MongoDB Atlas logs in the dashboard
3. Visit MongoDB Community Forums
4. Check our application logs for specific error messages

Remember: The free tier (M0 Sandbox) has some limitations but should work perfectly for development!
