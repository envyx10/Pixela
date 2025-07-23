/** @type {import('next').NextConfig} */

const nextConfig = {
    trailingSlash: true,
    images: {
        domains: [
            'image.tmdb.org', 
            'via.placeholder.com', 
            'img.youtube.com',
            'laravel.test',
            'localhost',
            'i.pravatar.cc',
            'picsum.photos',
            'pixela.duckdns.org',
            'pixela.onrender.com'
        ],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://pixela.onrender.com/api',
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://pixela.onrender.com',
    },
    async rewrites() {
        // Solo usar rewrites en desarrollo
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/api/series/:path*',
                    destination: 'http://localhost/api/series/:path*',
                },
                {
                    source: '/api/movies/:path*', 
                    destination: 'http://localhost/api/movies/:path*',
                },
            ];
        }
        return [];
    }
};

module.exports = nextConfig;