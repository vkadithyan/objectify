/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:5000/api'
  }
}

module.exports = nextConfig
