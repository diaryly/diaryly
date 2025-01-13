/* eslint-disable node/prefer-global/process */
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import solidPagesPlugin from 'vite-plugin-solid-pages'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, './src')}/`,
      },
    },
    base: env.VITE_BASE_PATH,
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: 'es2015',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[hash].js',
          entryFileNames: 'static/js/[[hash].js',
          assetFileNames: 'static/[ext]/[hash].[ext]',
        },
      },
    },
    css: {
      modules: false,
    },
    plugins: [UnoCSS(), solid(), solidPagesPlugin({
      dir: 'src/pages',
      extensions: ['tsx'],
    })],
  }
})
