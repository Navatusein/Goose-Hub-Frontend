/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENVIRONMENT: "Development" | "Production" | string;
  readonly VITE_CONTENT_CAROUSEL_IDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.module.css";
declare module "*.module.scss";