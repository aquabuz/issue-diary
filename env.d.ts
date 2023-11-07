declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
      VITE_APP_API_KEY: string;
      VITE_APP_ENV: string;
      // 다른 환경 변수도 필요한 경우 여기에 추가
    }
  }
}
