import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'datetime-web-component',
      fileName: (format) => `datetime-web-component.${format}.js`,
    },
    rollupOptions: {
      output: {},
    },
  },
  test: {
    globals: true
  }
})
