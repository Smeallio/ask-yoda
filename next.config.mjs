/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 300, // Delay the rebuild after the first change (ms)
        };
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  