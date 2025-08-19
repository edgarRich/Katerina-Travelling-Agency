// Import Supabase client from CDN
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://xduxoyahnrlbuygkrsli.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);