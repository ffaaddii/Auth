import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Added for debugging: Log the values being read
console.log("[Supabase Client] VITE_SUPABASE_URL:", supabaseUrl ? "Loaded" : "Undefined");
console.log("[Supabase Client] VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Loaded" : "Undefined");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your .env file.");
  // Throw an error to prevent further execution with undefined client
  throw new Error("Supabase URL or Anon Key is required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);