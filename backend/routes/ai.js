const express = require('express');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @route   POST /api/ai/generate-story
// @desc    Generate AI story for an object
// @access  Private
router.post('/generate-story', [
  auth,
  [
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
    body('mood').isIn(['happy', 'sad', 'excited', 'peaceful', 'contemplative', 'energetic', 'calm', 'curious'])
      .withMessage('Invalid mood')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imageUrl, mood } = req.body;

    // Create a detailed prompt for story generation
    const prompt = `You are a creative storyteller who brings objects to life with personality and emotion. 

Analyze this image: ${imageUrl}

The object in this image should have a ${mood} mood/personality.

Create a short, engaging, and whimsical backstory (2-3 sentences) for this object from its perspective. The story should:

1. Give the object a name or personality
2. Reflect the ${mood} mood throughout the narrative
3. Be creative and imaginative but relatable
4. Include appropriate emojis to enhance the mood
5. Be written in a friendly, conversational tone
6. Be between 100-200 words

Make the story feel authentic and give the object a unique voice that matches its ${mood} personality.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 300,
      temperature: 0.8
    });

    const generatedStory = completion.choices[0].message.content;

    res.json({
      story: generatedStory,
      mood: mood,
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('Error generating story:', error);
    
    // Fallback stories if AI fails
    const fallbackStories = {
      happy: "This object is absolutely beaming with joy today! It's been waiting for this moment to shine and share its positive energy with the world. The way it catches the light makes it feel like it's doing a little happy dance! ✨",
      sad: "This object seems to be having a melancholic moment. Maybe it's missing its companion or feeling a bit lonely today. But even in its sadness, there's a quiet beauty that speaks to the soul.",
      excited: "WOW! This object is practically vibrating with excitement! It's like it just won the lottery or discovered a superpower. The energy is contagious - you can almost feel it buzzing with anticipation! 🚀",
      peaceful: "There's such a serene calmness about this object today. It's like it's found its zen moment, floating in a state of perfect tranquility. The peace it radiates is almost meditative.",
      contemplative: "This object appears to be deep in thought, pondering the mysteries of the universe. It's having one of those philosophical moments where everything makes sense and nothing makes sense at the same time.",
      energetic: "This object is bursting with life and energy! It's like it just had three cups of coffee and is ready to take on the world. The dynamic vibes are off the charts! ⚡",
      calm: "There's a gentle, soothing presence about this object. It's like a warm hug or a soft lullaby - just being near it brings a sense of inner peace and relaxation.",
      curious: "This object has that spark of curiosity in its eyes (if it had eyes!). It's like it's constantly asking 'what if?' and exploring the world with wonder and amazement."
    };

    res.json({
      story: fallbackStories[mood] || fallbackStories.happy,
      mood: mood,
      imageUrl: imageUrl,
      note: "Generated using fallback story due to AI service issue"
    });
  }
});

// @route   POST /api/ai/analyze-object
// @desc    Analyze object in image (optional enhancement)
// @access  Private
router.post('/analyze-object', [
  auth,
  [
    body('imageUrl').notEmpty().withMessage('Image URL is required')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imageUrl } = req.body;

    const prompt = `Analyze this image and describe the main object in detail. Focus on:
1. What type of object it is
2. Its physical characteristics (color, size, material, etc.)
3. Its context or setting
4. Any unique or interesting features
5. The overall mood or atmosphere of the image

Be descriptive but concise. This will help create better stories for the object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 200,
      temperature: 0.3
    });

    const analysis = completion.choices[0].message.content;

    res.json({
      analysis: analysis,
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('Error analyzing object:', error);
    res.status(500).json({ 
      error: 'Failed to analyze object',
      message: 'Please try again or proceed without analysis'
    });
  }
});

// @route   POST /api/ai/suggest-mood
// @desc    Suggest mood based on object analysis
// @access  Private
router.post('/suggest-mood', [
  auth,
  [
    body('imageUrl').notEmpty().withMessage('Image URL is required')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imageUrl } = req.body;

    const prompt = `Analyze this image and suggest the most fitting mood for the object from these options:
- happy: cheerful, joyful, positive
- sad: melancholic, somber, reflective
- excited: energetic, enthusiastic, thrilled
- peaceful: calm, serene, tranquil
- contemplative: thoughtful, introspective, philosophical
- energetic: dynamic, lively, vibrant
- calm: relaxed, soothing, gentle
- curious: inquisitive, wondering, intrigued

Consider the object's appearance, context, and the overall atmosphere. Respond with just the mood name.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 50,
      temperature: 0.3
    });

    const suggestedMood = completion.choices[0].message.content.trim().toLowerCase();

    // Validate the suggested mood
    const validMoods = ['happy', 'sad', 'excited', 'peaceful', 'contemplative', 'energetic', 'calm', 'curious'];
    const mood = validMoods.includes(suggestedMood) ? suggestedMood : 'happy';

    res.json({
      suggestedMood: mood,
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('Error suggesting mood:', error);
    res.status(500).json({ 
      error: 'Failed to suggest mood',
      message: 'Please select a mood manually'
    });
  }
});

module.exports = router;
