import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    define: {
        'import.meta.env.ENV_VARIABLE': JSON.stringify(
            process.env.ENV_VARIABLE
        ),
    },
});
