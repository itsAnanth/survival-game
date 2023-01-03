import { defineConfig } from "vite";
import CustomHmr from "./vitePlugins/CustomHmr";
import path from 'path';

export default defineConfig({
    root: 'game',
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
})