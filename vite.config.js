import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "MTB Coaching Network",
                short_name: "MTB Coaching",
                start_url: ".",
                display: "standalone",
                background_color: "#18181b",
                theme_color: "#eab308",
                icons: [
                    {
                        src: "/logo.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/logo.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
