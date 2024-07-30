/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // typescript: {
//   //   ignoreBuildErrors: true,
//   // },
// };
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };
    return config;
  },
};

export default nextConfig;

// import withPWAInit from "@ducanh2912/next-pwa";

// const withPWA = withPWAInit({
//   dest: "public",
//   cacheOnFrontEndNav: true,
//   aggressiveFrontEndNavCaching: true,
//   reloadOnOnline: true,
//   swcMinify: true,
//   disable: false,
//   workboxOptions: {
//     disableDevLogs: true,
//   },
//   // disable: process.env.NODE_ENV === "development",
//   // register: true,
//   // scope: "/app",
//   // sw: "service-worker.js",
//   //   fallbacks: {
//   //     // Failed page requests fallback to this.
//   //     document: "/~offline",
//   //     // This is for /_next/.../.json files.
//   //     data: "/fallback.json",
//   //     // This is for images.
//   //     image: "/fallback.webp",
//   //     // This is for audio files.
//   //     audio: "/fallback.mp3",
//   //     // This is for video files.
//   //     video: "/fallback.mp4",
//   //     // This is for fonts.
//   //     font: "/fallback-font.woff2",
//   //   },

//   //   workboxOptions: {
//   //     disableDevLogs: true,
//   //     runtimeCaching: [
//   //       // Your runtimeCaching array
//   //     ],
//   //     // Workbox options go here...
//   //   },
// });

// // Your Next config is automatically typed!
// export default withPWA({
//   // Your Next.js config
// });
