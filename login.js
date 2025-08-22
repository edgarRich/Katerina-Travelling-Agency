import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI")

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value 
  const password = document.getElementById("password").value 

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return alert(error.message)

  // Role-based redirect (stored in "profiles" table)
  const { data: profile } = await supabase 
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single()
    
  if(profile?.role === "admin") window.location.href = "admin.html"
  else if (profile?.role === "agent")window.location.href = "agent.html"
  else window.location.href = "client.html"   
})  