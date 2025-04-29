/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/series/:path*',
                destination: 'http://laravel.test/api/series/:path*',
            },
            {
                source: '/api/movies/:path*',
                destination: 'http://laravel.test/api/movies/:path*',
            },
        ];
    },
    images: {
        domains: [
            'image.tmdb.org', 
            'via.placeholder.com', 
            'img.youtube.com',
            'laravel.test',
            'localhost'
        ],
    },
};

module.exports = nextConfig; 