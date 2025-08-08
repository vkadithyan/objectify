'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Sparkles, Heart, MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import PostCard from '@/components/PostCard'
import { Post } from '@/types/post'

// Demo data with lots of objects and stories
const mockPosts: Post[] = [

  {
    id: '2',
    userId: 'user2',
    username: 'art_collector',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This old typewriter has seen generations of stories unfold. Its keys have danced across countless pages, bringing characters to life and worlds into existence. Today it sits quietly, contemplating its next masterpiece. The gentle click-clack of its memories echo through time...',
    likes: ['user1', 'user3'],
    comments: [
      { id: '3', userId: 'user1', username: 'creative_soul', text: 'So poetic! I can almost hear the stories it wants to tell', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-14T15:45:00Z')
  },
  {
    id: '3',
    userId: 'user3',
    username: 'plant_parent',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'Fernando the fern is having a zen moment today. He\'s been practicing his breathing exercises (photosynthesis) and feeling particularly connected to nature. His leaves are reaching toward the sunlight like tiny green hands saying "thank you" to the universe. 🌿✨',
    likes: ['user1', 'user2', 'user4', 'user5'],
    comments: [
      { id: '4', userId: 'user4', username: 'nature_lover', text: 'Fernando is goals! I need to learn his zen ways 🌱', createdAt: new Date() },
      { id: '5', userId: 'user5', username: 'green_thumb', text: 'What a beautiful perspective on plant life!', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-13T09:15:00Z')
  },
  {
    id: '4',
    userId: 'user4',
    username: 'vintage_lover',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop',
    mood: 'curious',
    story: 'This vintage camera has captured thousands of precious moments! From family gatherings to street photography adventures, it\'s been my faithful companion. Today it\'s feeling curious about all the digital cameras around, wondering if they have the same soul and character that comes with film photography. 📸',
    likes: ['user1', 'user5', 'user6'],
    comments: [
      { id: '6', userId: 'user1', username: 'creative_soul', text: 'Film photography has such a unique charm!', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-12T14:20:00Z')
  },
  {
    id: '5',
    userId: 'user5',
    username: 'book_worm',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop',
    mood: 'excited',
    story: 'This stack of books is absolutely thrilled! They\'ve been waiting patiently on the shelf, and today someone finally picked them up for a reading marathon. Each book is excited to share its adventures - from mystery novels to poetry collections. They\'re practically vibrating with anticipation! 📚✨',
    likes: ['user2', 'user3', 'user7'],
    comments: [
      { id: '7', userId: 'user2', username: 'art_collector', text: 'Books have the best stories to tell!', createdAt: new Date() },
      { id: '8', userId: 'user7', username: 'reader_extraordinaire', text: 'I can feel their excitement! 📖', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-11T16:45:00Z')
  },
  {
    id: '6',
    userId: 'user6',
    username: 'music_maker',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
    mood: 'energetic',
    story: 'This guitar is feeling absolutely electric today! It\'s been strummed, picked, and loved for years, creating melodies that have moved hearts and souls. Right now it\'s buzzing with energy, ready to create the next hit song. The strings are practically humming with excitement! 🎸⚡',
    likes: ['user1', 'user4', 'user8'],
    comments: [
      { id: '9', userId: 'user8', username: 'melody_master', text: 'Music is the language of the soul! 🎵', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-10T19:30:00Z')
  },
  {
    id: '7',
    userId: 'user7',
    username: 'tea_enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop',
    mood: 'calm',
    story: 'This elegant teapot is in its zen mode today. It\'s served countless cups of comfort, warmth, and tranquility. From morning Earl Grey to evening chamomile, it knows the secret to brewing the perfect cup. Today it\'s feeling particularly serene, ready to bring peace to anyone who needs it. 🍵🧘‍♀️',
    likes: ['user3', 'user5', 'user9'],
    comments: [
      { id: '10', userId: 'user9', username: 'zen_master', text: 'Tea ceremony is meditation in action', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-09T08:15:00Z')
  },
  {
    id: '8',
    userId: 'user8',
    username: 'adventure_seeker',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    mood: 'excited',
    story: 'These hiking boots are absolutely pumped! They\'ve climbed mountains, crossed rivers, and walked through forests. Every scuff and scratch tells a story of adventure. Today they\'re practically bouncing with excitement, ready for the next great expedition. The trails are calling! 🥾⛰️',
    likes: ['user1', 'user6', 'user10'],
    comments: [
      { id: '11', userId: 'user10', username: 'mountain_climber', text: 'Adventure awaits! 🏔️', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-08T12:00:00Z')
  },
  {
    id: '9',
    userId: 'user9',
    username: 'artist_soul',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This paintbrush is deep in thought today. It\'s created masterpieces, abstract expressions, and everything in between. Each stroke has been a dance of creativity and emotion. Right now it\'s contemplating its next creation, wondering what colors and emotions it will bring to life on the canvas. 🎨✨',
    likes: ['user2', 'user4', 'user7'],
    comments: [
      { id: '12', userId: 'user2', username: 'art_collector', text: 'Art is the window to the soul', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-07T15:30:00Z')
  },
  {
    id: '10',
    userId: 'user10',
    username: 'chef_extraordinaire',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
    mood: 'happy',
    story: 'This chef\'s knife is absolutely delighted! It\'s chopped, diced, and sliced its way through countless culinary adventures. From delicate herbs to hearty vegetables, it\'s been the star of the kitchen. Today it\'s beaming with joy, ready to help create another delicious masterpiece! 🔪👨‍🍳',
    likes: ['user1', 'user3', 'user8'],
    comments: [
      { id: '13', userId: 'user1', username: 'creative_soul', text: 'Cooking is an art form! 🍳', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-06T18:45:00Z')
  },
  {
    id: '11',
    userId: 'user11',
    username: 'retro_gamer',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop',
    mood: 'excited',
    story: 'This vintage game controller is absolutely thrilled! It remembers the golden age of gaming - countless hours of epic adventures, boss battles, and high scores. Today it\'s buzzing with nostalgia and excitement, ready to relive those legendary gaming moments! 🎮✨',
    likes: ['user4', 'user6', 'user9'],
    comments: [
      { id: '14', userId: 'user6', username: 'music_maker', text: 'Those were the days! 🕹️', createdAt: new Date() },
      { id: '15', userId: 'user9', username: 'artist_soul', text: 'Pixel perfect memories!', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-05T20:30:00Z')
  },
  {
    id: '12',
    userId: 'user12',
    username: 'watch_collector',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This elegant timepiece is deep in contemplation today. It has witnessed countless moments - first dates, job interviews, celebrations, and quiet reflections. Each tick carries the weight of time itself, reminding us that every second is precious and fleeting. ⏰💭',
    likes: ['user2', 'user5', 'user10'],
    comments: [
      { id: '16', userId: 'user2', username: 'art_collector', text: 'Time is the most valuable currency', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-04T11:15:00Z')
  },
  {
    id: '13',
    userId: 'user13',
    username: 'coffee_connoisseur',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
    mood: 'energetic',
    story: 'This espresso machine is absolutely electrified today! It\'s the heart and soul of the morning ritual, transforming humble beans into liquid energy. The steam is dancing, the pressure is perfect, and it\'s ready to fuel another day of dreams and ambitions! ☕⚡',
    likes: ['user1', 'user7', 'user11'],
    comments: [
      { id: '17', userId: 'user1', username: 'creative_soul', text: 'Coffee is life! ☕', createdAt: new Date() },
      { id: '18', userId: 'user7', username: 'tea_enthusiast', text: 'Respect for the bean! 🫘', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-03T07:45:00Z')
  },
  {
    id: '14',
    userId: 'user14',
    username: 'vinyl_enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'This vintage record player is in perfect harmony today. It spins tales of musical history, each groove holding memories of legendary performances. The needle dances gracefully, bringing analog warmth to digital souls. Music has never sounded so pure and timeless. 🎵💫',
    likes: ['user6', 'user8', 'user12'],
    comments: [
      { id: '19', userId: 'user6', username: 'music_maker', text: 'Analog soul in a digital world 🎶', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-02T16:20:00Z')
  },
  {
    id: '15',
    userId: 'user15',
    username: 'tech_minimalist',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    mood: 'calm',
    story: 'This sleek smartphone is embracing minimalism today. Despite containing the power of a supercomputer, it finds peace in simplicity. Clean lines, elegant design, and purposeful functionality - it represents the perfect balance between technology and tranquility. 📱🧘',
    likes: ['user3', 'user9', 'user13'],
    comments: [
      { id: '20', userId: 'user9', username: 'artist_soul', text: 'Less is more! 📐', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-01T14:30:00Z')
  },
  {
    id: '16',
    userId: 'user16',
    username: 'candle_maker',
    userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1602874801007-62a2c5b9b8ae?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'This handcrafted candle is radiating serenity today. It holds the essence of countless peaceful evenings - meditation sessions, romantic dinners, and quiet reading moments. Its gentle flame dances with wisdom, bringing warmth and light to every corner of the soul. 🕯️✨',
    likes: ['user5', 'user7', 'user14'],
    comments: [
      { id: '21', userId: 'user7', username: 'tea_enthusiast', text: 'Perfect for evening meditation 🧘‍♀️', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-31T19:45:00Z')
  },
  {
    id: '17',
    userId: 'user17',
    username: 'sneaker_head',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
    mood: 'energetic',
    story: 'These limited edition sneakers are absolutely pumped! They\'ve been waiting in the box, dreaming of street adventures and urban exploration. Every stitch tells a story of craftsmanship, and today they\'re ready to hit the pavement with style and attitude! 👟🔥',
    likes: ['user8', 'user11', 'user15'],
    comments: [
      { id: '22', userId: 'user8', username: 'adventure_seeker', text: 'Fresh kicks for fresh adventures! 🏃‍♂️', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-30T13:15:00Z')
  },
  {
    id: '18',
    userId: 'user18',
    username: 'succulent_parent',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&h=600&fit=crop',
    mood: 'happy',
    story: 'This adorable succulent is absolutely glowing with happiness! It\'s been soaking up sunshine and spreading joy with its perfect geometric patterns. Low maintenance but high impact, it proves that sometimes the smallest things bring the greatest joy to our lives! 🌵😊',
    likes: ['user3', 'user10', 'user16'],
    comments: [
      { id: '23', userId: 'user3', username: 'plant_parent', text: 'Succulent squad! 🌱', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-29T10:00:00Z')
  },
  {
    id: '19',
    userId: 'user19',
    username: 'fountain_pen_lover',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=600&fit=crop',
    mood: 'contemplative',
    story: 'This elegant fountain pen is deep in philosophical thought today. It has written love letters, signed important documents, and penned countless stories. The ink flows like liquid thoughts, and today it contemplates the power of words to change the world. ✒️💭',
    likes: ['user2', 'user4', 'user12'],
    comments: [
      { id: '24', userId: 'user2', username: 'art_collector', text: 'The pen is mightier than the sword! ⚔️', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-28T15:30:00Z')
  },
  {
    id: '20',
    userId: 'user20',
    username: 'crystal_collector',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1602874801007-62a2c5b9b8ae?w=600&h=600&fit=crop',
    mood: 'curious',
    story: 'This mystical crystal is buzzing with curiosity today! It has absorbed energy from countless meditation sessions and healing practices. Each facet reflects light differently, and it wonders about the mysteries of the universe hidden within its crystalline structure. 💎🔮',
    likes: ['user1', 'user5', 'user18'],
    comments: [
      { id: '25', userId: 'user5', username: 'book_worm', text: 'Crystals hold ancient wisdom! ✨', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-27T12:45:00Z')
  },
  {
    id: '21',
    userId: 'user21',
    username: 'pottery_artist',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'This handcrafted ceramic vase is feeling incredibly zen today! Born from clay and fire, it has found its purpose holding beautiful flowers and bringing tranquility to any space. Each curve was shaped with love and intention. 🏺✨',
    likes: ['user2', 'user7', 'user16'],
    comments: [
      { id: '26', userId: 'user2', username: 'art_collector', text: 'Beautiful craftsmanship! 🎨', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-26T09:30:00Z')
  },
  {
    id: '22',
    userId: 'user22',
    username: 'bike_enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    mood: 'energetic',
    story: 'This mountain bike is absolutely pumped for adventure! It has conquered trails, jumped over rocks, and felt the wind rushing through its spokes. Today it\'s vibrating with excitement, ready for the next epic ride through nature! 🚵‍♂️⛰️',
    likes: ['user8', 'user17', 'user19'],
    comments: [
      { id: '27', userId: 'user8', username: 'adventure_seeker', text: 'Ready to hit the trails! 🚵‍♂️', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-25T14:15:00Z')
  },
  {
    id: '23',
    userId: 'user23',
    username: 'sunglasses_lover',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop',
    mood: 'cool',
    story: 'These aviator sunglasses are feeling incredibly cool today! They\'ve shielded eyes from bright sunshine, witnessed countless sunsets, and added style to every adventure. Behind these lenses lie stories of summer days and endless horizons. 😎☀️',
    likes: ['user4', 'user12', 'user20'],
    comments: [
      { id: '28', userId: 'user12', username: 'watch_collector', text: 'Classic style never goes out of fashion! 😎', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-24T16:45:00Z')
  },
  {
    id: '24',
    userId: 'user24',
    username: 'backpack_traveler',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    mood: 'excited',
    story: 'This trusty backpack is bursting with wanderlust! It has carried dreams across continents, held precious memories, and been a faithful companion through countless adventures. Today it\'s practically vibrating with excitement for the next journey! 🎒✈️',
    likes: ['user8', 'user11', 'user22'],
    comments: [
      { id: '29', userId: 'user8', username: 'adventure_seeker', text: 'Adventure awaits! 🌍', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-23T11:20:00Z')
  },
  {
    id: '25',
    userId: 'user25',
    username: 'lamp_designer',
    userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop',
    mood: 'warm',
    story: 'This elegant table lamp is glowing with warmth today! It has illuminated countless late-night reading sessions, romantic dinners, and cozy conversations. Its gentle light creates the perfect ambiance for life\'s most precious moments. 💡🏠',
    likes: ['user16', 'user18', 'user21'],
    comments: [
      { id: '30', userId: 'user16', username: 'candle_maker', text: 'Beautiful lighting creates magic! ✨', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-22T19:00:00Z')
  },
  {
    id: '26',
    userId: 'user26',
    username: 'headphone_audiophile',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    mood: 'peaceful',
    story: 'These premium headphones are in their element today! They\'ve delivered crystal-clear melodies, thunderous bass, and whispered vocals directly to the soul. Music flows through them like a river of pure emotion. 🎧🎵',
    likes: ['user6', 'user14', 'user25'],
    comments: [
      { id: '31', userId: 'user6', username: 'music_maker', text: 'Music is life! 🎵', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-21T13:30:00Z')
  },
  {
    id: '27',
    userId: 'user27',
    username: 'wallet_minimalist',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop',
    mood: 'organized',
    story: 'This sleek leather wallet is feeling perfectly organized today! It holds life\'s essentials with style and efficiency - cards, cash, and memories all in their perfect place. Minimalism meets functionality in perfect harmony. 👛💳',
    likes: ['user15', 'user23', 'user26'],
    comments: [
      { id: '32', userId: 'user15', username: 'tech_minimalist', text: 'Less is more! 📐', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-20T10:45:00Z')
  },
  {
    id: '28',
    userId: 'user28',
    username: 'keychain_collector',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    mood: 'nostalgic',
    story: 'This vintage keychain is feeling wonderfully nostalgic today! Each key tells a story - home, office, memories of places lived and loved. It jingles with the music of life\'s journeys and the promise of new doors to unlock. 🗝️🏠',
    likes: ['user4', 'user19', 'user24'],
    comments: [
      { id: '33', userId: 'user4', username: 'vintage_lover', text: 'Every key unlocks a memory! 🗝️', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-19T15:15:00Z')
  },
  {
    id: '29',
    userId: 'user29',
    username: 'mug_enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop',
    mood: 'cozy',
    story: 'This ceramic mug is embracing the coziest vibes today! It has warmed hands on cold mornings, held the perfect brew, and been a companion through countless conversations. Steam rises from within like gentle morning mist. ☕🌅',
    likes: ['user1', 'user13', 'user27'],
    comments: [
      { id: '34', userId: 'user1', username: 'creative_soul', text: 'Perfect for cozy mornings! ☕', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-18T08:00:00Z')
  },
  {
    id: '30',
    userId: 'user30',
    username: 'mirror_philosopher',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=600&fit=crop',
    mood: 'reflective',
    story: 'This antique mirror is in a deeply reflective mood today! It has witnessed countless transformations, reflected dreams and aspirations, and shown the beauty in every face that has gazed into it. Truth lives in its silvered surface. 🪞✨',
    likes: ['user2', 'user9', 'user28'],
    comments: [
      { id: '35', userId: 'user2', username: 'art_collector', text: 'Mirrors reflect the soul! 🪞', createdAt: new Date() }
    ],
    createdAt: new Date('2023-12-17T12:30:00Z')
  }
]

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Try to fetch from API if token exists
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
          return
        }
      }
      
      // Demo mode: combine demo data with user-created posts from localStorage
      const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      console.log('📱 User posts from localStorage:', userPosts)
      
      const sortedUserPosts = userPosts.sort((a: Post, b: Post) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      const sortedDemoData = mockPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      const allPosts = [...sortedUserPosts, ...sortedDemoData]
      console.log('📋 All posts (user + demo):', allPosts.length, 'total posts')
      setPosts(allPosts)
      
    } catch (error) {
      console.error('[ERROR] Error fetching posts:', error)
      // Always fallback to demo data with any user posts
      const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      console.log('📱 Fallback - User posts from localStorage:', userPosts)
      
      const sortedUserPosts = userPosts.sort((a: Post, b: Post) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      const sortedDemoData = mockPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      const allPosts = [...sortedUserPosts, ...sortedDemoData]
      console.log('📋 Fallback - All posts:', allPosts.length, 'total posts')
      setPosts(allPosts)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [])

  // Refresh posts when the page becomes visible (when user navigates back from create page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPosts()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Also refresh when window gets focus
    const handleFocus = () => {
      fetchPosts()
    }
    
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [fetchPosts])

  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem('token')
      const currentUserId = 'demo_user' // Demo user ID for demo mode
      
      // Try API if token exists
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/posts/${postId}/like`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          // Update the post in the local state
          setPosts(posts.map(post => 
            post.id === postId 
              ? { ...post, likes: [...post.likes, currentUserId] }
              : post
          ))
          return
        }
      }
      
      // Demo mode: handle likes locally
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes(currentUserId)
          const updatedLikes = hasLiked 
            ? post.likes.filter(id => id !== currentUserId)
            : [...post.likes, currentUserId]
          
          const updatedPost = { ...post, likes: updatedLikes }
          
          // Update localStorage for user-created posts
          const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
          const userPostIndex = userPosts.findIndex((p: Post) => p.id === postId)
          if (userPostIndex !== -1) {
            userPosts[userPostIndex] = updatedPost
            localStorage.setItem('userPosts', JSON.stringify(userPosts))
          }
          
          return updatedPost
        }
        return post
      }))
      
    } catch (error) {
      console.error('Error liking post:', error)
      // Still handle likes locally in demo mode
      const currentUserId = 'demo_user'
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes(currentUserId)
          return {
            ...post,
            likes: hasLiked 
              ? post.likes.filter(id => id !== currentUserId)
              : [...post.likes, currentUserId]
          }
        }
        return post
      }))
    }
  }

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-3xl font-bold gradient-text mb-2">Your Feed</h1>
            <p className="text-gray-600">Discover amazing objects and their stories</p>
          </motion.div>
          
          {/* Loading skeleton */}
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm border-b sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Feed</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/create" className="btn-primary inline-flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Feed Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + (index * 0.1),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <PostCard
                post={post}
                onLike={handleLike}
                isLiked={post.likes.includes('demo_user')}
              />
            </motion.div>
          ))}
        </motion.div>

        {posts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to bring an object to life!</p>
            <Link href="/create" className="btn-primary">
              Create Your First Post
            </Link>
          </div>
        )}
      </main>
    </motion.div>
  )
}
