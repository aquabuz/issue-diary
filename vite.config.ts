/**
 * fileURLToPath: 'node:url' 모듈에서 내보내진 함수로, 파일 URL을 로컬 파일 경로로 변환합니다.
 * URL: 'node:url' 모듈에서 내보내진 URL 클래스입니다. 이 클래스를 사용하여 URL을 다룰 수 있습니다.
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';

dotenv.config();

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetAttributify(), presetUno()], // Presets
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {},
  server: {},
  define: {
    'process.env': {
      VITE_SUPABASE_URL: JSON.stringify(
        process.env.VITE_SUPABASE_URL,
      ),
      VITE_SUPABASE_ANON_KEY: JSON.stringify(
        process.env.VITE_SUPABASE_ANON_KEY,
      ),
      VITE_APP_API_KEY: JSON.stringify(process.env.VITE_APP_API_KEY),
      VITE_APP_ENV: JSON.stringify(process.env.VITE_APP_ENV),
    },
  },
});
