# 🤖 OpenAI API Setup Guide

## Step 1: Create OpenAI Account

1. **Go to OpenAI**: https://platform.openai.com/
2. **Click "Sign Up"** or "Log In"
3. **Complete registration** with your email and phone verification

## Step 2: Add Payment Method

1. **Go to "Billing"** in the left sidebar
2. **Click "Add payment method"**
3. **Add your credit card** (required for API access)
4. **Note**: OpenAI offers free credits for new users

## Step 3: Create API Key

1. **Go to "API Keys"** in the left sidebar
2. **Click "Create new secret key"**
3. **Give it a name**: `Objectify AI Stories`
4. **Copy the API key** (starts with `sk-`)
5. **Save it securely** - you won't see it again!

## Step 4: Check Credits

1. **Go to "Usage"** in the left sidebar
2. **Check your available credits**
3. **Note**: GPT-4 Vision costs about $0.01-0.03 per image

## Step 5: Update Your .env File

Replace `OPENAI_API_KEY` in your `backend/.env` file with your API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## Step 6: Test the API

You can test your API key with this curl command:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## ✅ Verification

Your OpenAI setup is complete when:
- ✅ Account is created and verified
- ✅ Payment method is added
- ✅ API key is generated
- ✅ API key is updated in .env file

## 💡 Tips

- **Free Credits**: New users get free credits to start
- **Cost Control**: Monitor usage in the OpenAI dashboard
- **Rate Limits**: Be aware of API rate limits
- **Model**: The app uses GPT-4 Vision for image analysis
