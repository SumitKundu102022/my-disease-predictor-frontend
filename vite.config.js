// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import the 'path' module
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Maps "@" to "./src"
      // "@components": path.resolve(__dirname, "components"), // Maps "@components" to "./components"
      "@components": path.resolve(__dirname, "src/components"), // IMPORTANT: Check this path
      "@assets": path.resolve(__dirname, "src/assets"), // Maps "@assets" to "./assets"
    },
  },
});
