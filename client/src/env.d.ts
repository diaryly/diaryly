/// <reference types="vite/client" />
/// <reference types="vite-plugin-solid-pages/client" />


interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_BASE_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
