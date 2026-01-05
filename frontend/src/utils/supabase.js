import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = (supabaseAccessToken) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: supabaseAccessToken
          ? `Bearer ${supabaseAccessToken}`
          : "",
      },
    },
  });
};

export default supabaseClient;   // ✅ ADD THIS

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
