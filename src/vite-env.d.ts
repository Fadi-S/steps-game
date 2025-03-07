/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_API_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
