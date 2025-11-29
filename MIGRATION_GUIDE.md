# Pixela Backend Migration Guide

## Overview

This document describes the migration of the Pixela backend from Laravel/PHP to a TypeScript-based solution using Next.js API Routes.

## Architecture Decision

After analyzing the Laravel backend, we chose **Option B (Next.js API Routes)** instead of a dedicated NestJS backend because:

1. **Simple Business Logic**: The TMDB services are HTTP wrappers with data mapping
2. **Standard CRUD**: Controllers handle basic CRUD operations
3. **Simple Schema**: Only 3 main tables (users, favorites, reviews)
4. **Monorepo Benefits**: Single deployment, shared types, simpler CI/CD
5. **Native Integration**: NextAuth.js works seamlessly with Next.js

## What Changed

### Database

- **Before**: Laravel Migrations + MySQL
- **After**: Prisma ORM + MongoDB (MongoDB Atlas - free tier available)

### Authentication

- **Before**: Laravel Sanctum (token-based)
- **After**: NextAuth.js (Auth.js) with JWT strategy

### TMDB Services

- **Before**: PHP classes (TmdbService.php, TmdbMovieService.php, TmdbSeriesService.php)
- **After**: TypeScript classes in `src/lib/services/`

### API Routes

- **Before**: `pixela-backend/routes/api.php`
- **After**: `pixela-frontend/src/app/api/`

## Setup Instructions

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```env
# Database (MongoDB Atlas - get free cluster at mongodb.com/atlas)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/pixela?retryWrites=true&w=majority"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=cualquier-texto-largo-y-aleatorio-aqui

# TMDB API
TMDB_API_KEY=your-tmdb-api-key-here
```

### 2. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to MongoDB (no migrations needed)
npx prisma db push
```

### 3. Run Development Server

```bash
npm run dev
```

## API Endpoints Reference

### TMDB (Public)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tmdb/categories` | GET | Get all movie genres |
| `/api/tmdb/trending` | GET | Get trending content (all) |

### Movies (Public)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/movies/trending` | GET | Get trending movies |
| `/api/movies/discover` | GET | Discover movies |
| `/api/movies/top-rated` | GET | Get top-rated movies |
| `/api/movies/now-playing` | GET | Get now playing movies |
| `/api/movies/search?query=...` | GET | Search movies |
| `/api/movies/genre/[genreId]` | GET | Get movies by genre |
| `/api/movies/[movieId]` | GET | Get movie details |
| `/api/movies/[movieId]/cast` | GET | Get movie cast |
| `/api/movies/[movieId]/videos` | GET | Get movie videos |
| `/api/movies/[movieId]/watch-providers` | GET | Get streaming providers |
| `/api/movies/[movieId]/creator` | GET | Get movie director |
| `/api/movies/[movieId]/images` | GET | Get movie images |
| `/api/movies/[movieId]/reviews` | GET | Get TMDB reviews |

### Series (Public)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/series/trending` | GET | Get trending series |
| `/api/series/discover` | GET | Discover series |
| `/api/series/top-rated` | GET | Get top-rated series |
| `/api/series/on-the-air` | GET | Get series on the air |
| `/api/series/search?query=...` | GET | Search series |
| `/api/series/genre/[genreId]` | GET | Get series by genre |
| `/api/series/[seriesId]` | GET | Get series details |
| `/api/series/[seriesId]/cast` | GET | Get series cast |
| `/api/series/[seriesId]/videos` | GET | Get series videos |
| `/api/series/[seriesId]/watch-providers` | GET | Get streaming providers |
| `/api/series/[seriesId]/images` | GET | Get series images |
| `/api/series/[seriesId]/reviews` | GET | Get TMDB reviews |

### User Authentication (Protected)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | * | NextAuth.js handlers |
| `/api/user` | GET | Get current user |

### Favorites (Protected)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/favorites` | POST | Add to favorites |
| `/api/favorites/details` | GET | Get favorites with TMDB details |
| `/api/favorites/[favoriteId]` | DELETE | Remove from favorites |

### Reviews (Protected)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/reviews` | GET | Get user's reviews |
| `/api/reviews` | POST | Add a review |
| `/api/reviews/[reviewId]` | PUT | Update a review |
| `/api/reviews/[reviewId]` | DELETE | Delete a review |
| `/api/reviews/media/[tmdbId]/[itemType]` | GET | Get reviews for specific media |

### Users (Admin Protected)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | List all users (admin only) |
| `/api/users` | POST | Create user (admin only) |
| `/api/users/[userId]` | PUT | Update user |
| `/api/users/[userId]` | DELETE | Delete user |

## Frontend Integration

Update your frontend API calls to use the new relative URLs:

```typescript
// Before (Laravel backend)
const response = await fetch('http://localhost/api/movies/trending');

// After (Next.js API Routes)
const response = await fetch('/api/movies/trending');
```

## Database Schema

The Prisma schema is located at `prisma/schema.prisma`. Key models:

- `User` - User accounts with NextAuth.js integration
- `Favorite` - User favorites (movies/series)
- `Review` - User reviews with ratings
- `Account` - OAuth provider accounts (NextAuth.js)
- `Session` - User sessions (NextAuth.js)

## Removing the Old Backend

Once the migration is complete and tested, you can safely remove the `pixela-backend` directory:

```bash
rm -rf pixela-backend
```

## Support

If you encounter any issues during migration, please check:

1. Environment variables are correctly configured
2. MongoDB Atlas cluster is accessible (check IP whitelist)
3. Prisma Client has been generated (`npx prisma generate`)
4. Database schema has been pushed (`npx prisma db push`)
