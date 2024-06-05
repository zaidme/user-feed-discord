
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Add custom rule for handling .node files
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
  
      if (isServer) {
        // Exclude zlib-sync from the server-side bundle
        config.externals = config.externals || [];
        config.externals.push('zlib-sync');
      }
  
      return config;
    },
  };
  
export default nextConfig
  




