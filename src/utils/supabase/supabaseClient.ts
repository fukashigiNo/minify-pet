import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaBaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabseClient = createClient(supabaseUrl, supaBaseKey)

export default supabseClient    