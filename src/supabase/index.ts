import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bioaqexzzrwwrutpwikr.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
console.log("supabaseKey", supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
