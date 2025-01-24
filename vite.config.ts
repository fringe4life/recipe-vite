import { defineConfig } from 'vite';
import path from 'node:path';

// Path aliases
const alias = {
  '@': path.resolve(__dirname, 'src'),
  '@images': path.resolve(__dirname, '/src/images'),
  '@styles': path.resolve(__dirname, '/src/styles'),
};

// Function to import and make Vite aware of all HTML files
const htmlPlugin = () => {
  return {
    name: 'html-import-all',
    
    async transform(code: string, id: string) {
      if (!/\.html$/.test(id)) return;
      const result = await this.transform(code, id, {
        loader: 'js',
      });
      return {
        code: result.code,
        map: result.map,
      };
    },
  };
};

// Vite config
export default defineConfig({
  plugins: [htmlPlugin()],
  resolve: {
    alias,
  },
  build: {
    minify: true,
    target: 'esnext',
    rollupOptions: {
      // Disable console and debugger
      output: {
        inlineDynamicImports: true,
        
      },
    },
  },
});