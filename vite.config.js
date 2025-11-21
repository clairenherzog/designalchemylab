import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// set base to your repo name so assets load correctly on GitHub Pages
export default defineConfig({
  base: '/designalchemylab/',
  plugins: [react()]
})
