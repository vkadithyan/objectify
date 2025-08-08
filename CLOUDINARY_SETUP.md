# ☁️ Cloudinary Setup Guide

## Step 1: Create Cloudinary Account

1. **Go to Cloudinary**: https://cloudinary.com/users/register/free
2. **Click "Sign Up for Free"**
3. **Fill in your details**:
   - Email address
   - Password
   - Account name (e.g., "Objectify Images")
4. **Complete registration**

## Step 2: Get Your Credentials

1. **Log in to your Cloudinary Dashboard**
2. **Look for "Account Details"** section
3. **Copy these three values**:
   - **Cloud Name** (e.g., `mycloud123`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnop`)

## Step 3: Update Your .env File

Replace the Cloudinary values in your `backend/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 4: Test Upload (Optional)

You can test your Cloudinary setup with this curl command:

```bash
curl -X POST \
  https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
  -F "file=@test-image.jpg" \
  -F "api_key=YOUR_API_KEY" \
  -F "timestamp=$(date +%s)" \
  -F "signature=YOUR_SIGNATURE"
```

## ✅ Verification

Your Cloudinary setup is complete when:
- ✅ Account is created
- ✅ Cloud Name is copied
- ✅ API Key is copied
- ✅ API Secret is copied
- ✅ All values are updated in .env file

## 💡 Tips

- **Free Tier**: 25 GB storage, 25 GB bandwidth/month
- **Image Optimization**: Cloudinary automatically optimizes images
- **Transformations**: Supports resizing, cropping, filters
- **Security**: Keep your API secret secure
- **Folder Structure**: Images will be stored in `objectify/` folder

## 🔒 Security Note

- Never commit your `.env` file to version control
- Keep your API secret private
- Monitor your usage in the Cloudinary dashboard
