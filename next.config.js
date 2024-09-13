/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: [
        {
            urlPattern: /^https?.*/, // Cache all HTTP requests
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "http-cache",
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        // {
        //     urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
        //     handler: "CacheFirst",
        //     options: {
        //         cacheName: "google-fonts-webfonts",
        //         expiration: {
        //             maxEntries: 4,
        //             maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        //         },
        //     },
        // },
        // {
        //     urlPattern: ({ url }) => {
        //         const isSameOrigin = self.origin === url.origin;
        //         return !isSameOrigin;
        //     },
        //     handler: "CacheFirst",
        //     options: {
        //         cacheName: "cross-origin",
        //         expiration: {
        //             maxEntries: 32,
        //             maxAgeSeconds: 60 * 60, // 1 hour
        //         },
        //         networkTimeoutSeconds: 10,
        //     },
        // },
        {
            urlPattern: /^https:\/\/sample\.website\.net\/items\/.+/i,
            handler: "CacheFirst",
            options: {
                cacheName: "database-assets",
                expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                },
            },
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|mp3|wav)$/i, // Cache image and audio files
            handler: "CacheFirst",
            options: {
                cacheName: "media-assets",
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
            },
        },
    ],
});

module.exports = withPWA({
    images: {
        domains: ["supabase.io", "bioaqexzzrwwrutpwikr.supabase.co"],
    },
});
