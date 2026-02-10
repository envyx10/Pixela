/** @type {import('next').NextConfig} */

// PRODUCTION: const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

const nextConfig = {
    // output: 'export',
    // Rewrites removed as we now handle API internal routing within Next.js
    
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            // Local dev domains
            {
                 protocol: 'http',
                 hostname: 'localhost',
            },
            {
                  protocol: 'http',
                  hostname: 'laravel.test',
            }
        ],
    },
    
    /**
     * Optimizaciones de performance para reducir warnings de preload
     * Nota: optimizeCss requiere módulo 'critters' - desactivado temporalmente
     */
    experimental: {
        // Reducir preloading agresivo
        optimisticClientCache: false,
    },
};

module.exports = nextConfig; 