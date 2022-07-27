const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    loader: 'preview-image',
    path: 'https://giveth.mypinata.cloud/ipfs/QmQ9sfdevs9vS7czBXBfDaRRPhU8a6T5gXxF3NDGSnQe1c',
  },
};

module.exports = nextConfig;
