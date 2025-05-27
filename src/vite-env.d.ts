/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_GEMINI_API_KEY: string;
  // Add other environment variables here as needed
  // For example, if you use a backend URL:
  // readonly VITE_BACKEND_API_URL: string;
  // readonly VITE_ANOTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
