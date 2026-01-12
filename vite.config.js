import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "react-router"],
                    swiper: ["swiper"],
                    pdf: ["html2pdf.js"],
                    "3d": ["@google/model-viewer", "three"],
                },
            },
            onwarn(warning, warn) {
                if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
                warn(warning);
            },
        },
    },
    server: {
        allowedHosts: true,
        host: true,
        port: 5555,
        hmr: {
            host: "localhost",
            protocol: "ws",
        },
    },
});
