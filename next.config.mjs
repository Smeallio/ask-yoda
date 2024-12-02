const nextConfig = {
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
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PLAYHT_USER_ID: process.env.PLAYHT_USER_ID,
    PLAYHT_API_KEY: process.env.PLAYHT_API_KEY,
  },
};

export default nextConfig;
