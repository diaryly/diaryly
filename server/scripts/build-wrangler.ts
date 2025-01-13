/* eslint-disable node/prefer-global/process */
import { writeFileSync } from 'fs-extra'
import stripIndent from 'strip-indent'

function env(name: string, defaultValue?: string, required = false) {
  const value = process.env[name] || defaultValue
  if (required && !value) {
    throw new Error(`${name} is not defined`)
  }
  return value
}

// must be defined
const renv = (name: string, defaultValue?: string) => env(name, defaultValue, true)!

// read env variables
const WORKER_NAME = renv('WORKER_NAME', 'diaryly-server')
const DB_TYPE = renv('DB_TYPE')
const DB_CONNECION_STRING = renv('DB_CONNECION_STRING')
const PASSWORD = renv('PASSWORD')

// 生成 wrangler.toml 内容
const wranglerConfig = stripIndent(`
#:schema node_modules/wrangler/config-schema.json
name = "${WORKER_NAME}"
main = "src/cloudflare-worker.ts"
compatibility_flags = [ "nodejs_compat" ]
compatibility_date = "2025-01-01"

[vars]
DB_TYPE = "${DB_TYPE}"
DB_CONNECTION = "${DB_CONNECION_STRING}"
PASSWORD = "${PASSWORD}"

[placement]
mode = "smart"
`)

// 写入 wrangler.toml 文件
writeFileSync('wrangler.toml', wranglerConfig)
console.log('wrangler.toml generated !!!')
