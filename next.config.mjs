/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        protocol: "http",
        hostname: "/**",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
