/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
            'localhost',
            'i.pravatar.cc'
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: 'static/css/[name].[contenthash].css',
                    chunkFilename: 'static/css/[id].[contenthash].css',
                })
            );
        }
        return config;
    },
};

module.exports = nextConfig; 