const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PLAYHT_USER_ID: process.env.PLAYHT_USER_ID,
    PLAYHT_API_KEY: process.env.PLAYHT_API_KEY,
  },
};

export default nextConfig;
