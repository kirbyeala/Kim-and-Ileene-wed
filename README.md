# Kim & Ileene Wedding Memories

A production-ready wedding photo sharing app built with Vue 3, Pinia, Express, MongoDB, Cloudinary, and Socket.io.

## Quick start

1. Copy `server/.env.example` to `server/.env` and add your MongoDB, Cloudinary, and admin credentials.
2. Run `npm run install:all`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

Without backend credentials, the frontend automatically runs in demo mode with curated sample images and local uploads.

## Production

Run `npm run build`, deploy `client/dist` to Netlify/Vercel, and deploy `server` to Render/Railway. Set `VITE_API_URL` and `VITE_SOCKET_URL` to the backend URL. Configure the production frontend origin as `CLIENT_URL`.

The upload endpoint is rate-limited and streams files to Cloudinary. For 500+ simultaneous guests, run multiple stateless API instances behind a load balancer, use a Socket.io Redis adapter, and move compression to direct signed Cloudinary uploads.

## Routes

- `/` landing page
- `/upload` guest uploads
- `/gallery` live gallery
- `/slideshow` fullscreen display
- `/admin` protected moderation panel
