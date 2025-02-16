// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['images.unsplash.com'], // Ajoutez 'images.unsplash.com' ici
//   },
  
// };

// export default nextConfig;


import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['example.com','img.freepik.com','i.pinimg.com'], // Add the domains from which images are fetched
  },
}

export default nextConfig
