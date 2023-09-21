/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.autonomous.ai",
      "cdn.arstechnica.net",
      "wallpaperaccess.com",
      "assets-prd.ignimgs.com",
      "webapi3.adata.com",
      "images.saymedia-content.com",
      "dicendpads.com",
      "static.vecteezy.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "i.ibb.co",
    ],
  },
};

module.exports = nextConfig;
