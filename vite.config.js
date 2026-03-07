import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/metrics/',
  resolve: {
    preserveSymlinks: true,
    dedupe: ['react', 'react-dom'], // Ensure React is resolved from the app's node_modules
  },
  build: {
    outDir: '../dist/metrics',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    exclude: ['@toolkit-pm/design-system'], // Exclude design system from pre-bundling
    esbuildOptions: {
      // Ensure React is available when processing design system
      jsx: 'automatic',
    },
  },
  server: {
    watch: {
      ignored: ['!**/packages/toolkit-pm-design-system/**'], // Watch local design system package
    },
  },
})

