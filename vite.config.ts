import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import {glob} from 'glob';

// Path aliases
const alias = {
  '@': path.resolve(__dirname, 'src'),
  '@images': path.resolve(__dirname, '/src/images'),
  '@styles': path.resolve(__dirname, '/src/styles'),
};

// Function to get all HTML files
const getAllHtmlFiles = (dir: string): string[] => {
  return glob.sync(`${dir}/**/*.html`);
};

// Get all HTML files from the src directory
const htmlFiles = getAllHtmlFiles(path.resolve(__dirname, 'src'));

// Vite config
export default defineConfig({
  plugins: [],
  resolve: {
    alias,
  },
  build: {
    minify: true,
    target: 'esnext',
    rollupOptions: {
      input: htmlFiles,
      // Disable console and debugger
      output: {
        inlineDynamicImports: true,
        
      },
    },
  },
  esbuild: {
      drop: ['console', 'debugger'],
  },
});