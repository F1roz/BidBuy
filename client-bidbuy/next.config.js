/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["firebasestorage.googleapis.com","images.unsplash.com","flowbite.com"]
  }
}

module.exports = nextConfig
