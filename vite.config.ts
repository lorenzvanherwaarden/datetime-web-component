import path from 'path'
import { defineConfig } from 'vite'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'datetime-web-component',
      fileName: (format) => `datetime-web-component.${format}.js`,
    },
    rollupOptions: {
      plugins: [
        replace({
          'process.env.NODE_ENV': '"production"',
          preventAssignment: true,
        }),
      ],
    },
  },
})
