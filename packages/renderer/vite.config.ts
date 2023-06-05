import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import fs from 'fs-extra'
import { GlobSync } from 'glob'
import { defineConfig } from 'vite'
import antdvFix from 'vite-plugin-antdv-fix'

const getWorkspaceAlias = () => {
  const basePath = resolve(__dirname, '../../')
  const pkg = fs.readJSONSync(resolve(basePath, 'package.json')) || {}
  const alias: Record<string, string> = {}
  const workspaces = pkg.workspaces
  if (Array.isArray(workspaces)) {
    workspaces.forEach((pattern) => {
      const { found } = new GlobSync(pattern, { cwd: basePath })
      found.forEach((name) => {
        try {
          const pkg = fs.readJSONSync(resolve(basePath, name, './package.json'))
          alias[`${pkg.name}/esm`] = resolve(basePath, name, './esm')
          alias[pkg.name] = resolve(basePath, name, './src')
        } catch (error) {
          /* empty */
        }
      })
    })
  }
  return alias
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), antdvFix()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~ant-design-vue': 'ant-design-vue',
      ...getWorkspaceAlias(),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
  server: {
    host: true,
  },
})
