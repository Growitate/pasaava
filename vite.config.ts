import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 6790,
    allowedHosts: ['pasaava.growithcp.live', '.growithcp.live', 'pasaava.cyberpunk.co.in', '.cyberpunk.co.in', 'localhost', '127.0.0.1']
  },
  preview: {
    host: true,
    port: 6790,
    allowedHosts: ['pasaava.growithcp.live', '.growithcp.live', 'pasaava.cyberpunk.co.in', '.cyberpunk.co.in', 'localhost', '127.0.0.1']
  }
});
