/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-check

const { withPlaiceholder } = require('@plaiceholder/next');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlaiceholder(nextConfig);