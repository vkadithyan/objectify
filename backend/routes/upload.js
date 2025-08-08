const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'objectify',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  }
});

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @route   POST /api/upload/image
// @desc    Upload image to Cloudinary
// @access  Private
router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Get the uploaded file details
    const result = req.file;

    res.json({
      success: true,
      imageUrl: result.path,
      publicId: result.filename,
      format: result.format,
      size: result.size
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    
    if (error.message === 'Only image files are allowed') {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB' });
    }
    
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// @route   DELETE /api/upload/image/:publicId
// @desc    Delete image from Cloudinary
// @access  Private
router.delete('/image/:publicId', auth, async (req, res) => {
  try {
    const { publicId } = req.params;

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ error: 'Failed to delete image' });
    }

  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// @route   POST /api/upload/optimize
// @desc    Optimize image URL for different use cases
// @access  Private
router.post('/optimize', auth, async (req, res) => {
  try {
    const { imageUrl, transformation } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Default transformations
    const defaultTransformations = {
      thumbnail: 'w_150,h_150,c_fill,g_auto',
      preview: 'w_400,h_400,c_fill,g_auto',
      full: 'w_800,h_800,c_limit,q_auto'
    };

    const transform = transformation || 'full';
    const transformString = defaultTransformations[transform];

    // Generate optimized URL
    const optimizedUrl = cloudinary.url(imageUrl, {
      transformation: transformString
    });

    res.json({
      originalUrl: imageUrl,
      optimizedUrl: optimizedUrl,
      transformation: transform
    });

  } catch (error) {
    console.error('Error optimizing image:', error);
    res.status(500).json({ error: 'Failed to optimize image' });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Only one file allowed' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field' });
    }
  }
  
  next(error);
});

module.exports = router;
