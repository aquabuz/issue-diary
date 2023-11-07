import { createClient } from '@supabase/supabase-js';

const supabaseUrl: any = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey: any = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
