const path = require('path')
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'datetime-webcomponent',
      fileName: format => `datetime-webcomponent.${format}.js`
    },
    rollupOptions: {
      output: {}
    }
  } 
})
