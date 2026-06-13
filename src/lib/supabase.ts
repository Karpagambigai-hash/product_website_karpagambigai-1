import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure we don't use placeholders if the user has provided real keys
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
