/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config){
    if(!config.dev){
      config.optimization.minimize = true
    }
    return config
  }
};

export default nextConfig;
