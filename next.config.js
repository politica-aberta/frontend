/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work
    return config;
  },
  output: 'standalone',
  experimental: {
    esmExternals: "loose", // required to make Konva & react-konva work
  },

}

module.exports = nextConfig;
