import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence
    storage: window.localStorage, // Use localStorage for session storage
    autoRefreshToken: true, // Enable automatic token refresh
    detectSessionInUrl: true // Enable session detection in URL
  }
});