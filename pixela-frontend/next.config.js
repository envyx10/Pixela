/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        domains: [
            'image.tmdb.org', 
            'via.placeholder.com', 
            'img.youtube.com',
            'laravel.test',
            'localhost',
            'i.pravatar.cc',
            'picsum.photos',
            'pixela.duckdns.org'
        ],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://pixela.duckdns.org/api',
    }
};

module.exports = nextConfig;