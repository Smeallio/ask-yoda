export const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, 
        aggregateTimeout: 300, 
      };
    }

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', 
        destination: 'https://api.funtranslations.com/translate/yoda.json?path=:path*',
      },
    ];
  },
};

export default nextConfig;

