import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const { name } = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))
const utilsPath = path.resolve(__dirname, './src/hooks')
const componentPath = path.resolve(__dirname, './src/components')
const pagePath = path.resolve(__dirname, './src/pages')

function getChunkName (id: string, configMap: Record<string, Array<string|RegExp>>) {
  for (const [name, matchConditions] of Object.entries(configMap)) {
    let isMapCondition = false
    const lastOneCond = matchConditions[matchConditions.length - 1]
    if (typeof lastOneCond === 'string' && /\/\*$/.test(lastOneCond)) {
      matchConditions[matchConditions.length - 1] = lastOneCond.replace(/\*$/, '')
      isMapCondition = true
    }
    const results = matchConditions.map((v) => {
      return v instanceof RegExp ? v.test(id) : id.includes(v)
    })
    if (!(results.every((v) => v))) continue
    if (isMapCondition) {
      const realLastOneCond = matchConditions[matchConditions.length - 1] as string
      const index = id.indexOf(realLastOneCond)
      const mapName = id.slice(index + realLastOneCond.length).replace(/\/.*$/, '')
      if (fs.statSync(path.resolve(id.slice(0, index + realLastOneCond.length), mapName)).isDirectory()) {
        return name.replace('[name]', lodash.snakeCase(mapName))
      } else {
        continue
      }
    }
    return name
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${name}`,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          return getChunkName(id, {
            'react-vendor': ['node_modules', /\/\breact(.*-dom)?\b\//],
            'react-utils': ['node_modules', /\breact\b/],
            'vendor': ['node_modules'],
            'pages/[name]': [path.resolve(pagePath, '*')],
            'pages': [pagePath],
          })
        },
      },
    },
  },
})
