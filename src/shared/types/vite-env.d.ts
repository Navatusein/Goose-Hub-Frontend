/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENVIRONMENT: "Development" | "Production";
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.module.css";
declare module "*.module.scss";