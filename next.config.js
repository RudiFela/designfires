/** @type {import('next').NextConfig} */
const nextConfig = {
  //  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  images: {
    domains: ["designfires.pl", "localhost"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
