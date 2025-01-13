import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

const entrys: Options[] = [{
  entry: {
    bun: 'src/bun.ts',
    cfworker: 'src/cloudflare-worker.ts',
    node: 'src/node.ts',
  },
  dts: true,
  format: 'cjs',
  external: ['bun:sqlite'],
  clean: true,
  splitting: true,
}]

export default defineConfig(entrys)
