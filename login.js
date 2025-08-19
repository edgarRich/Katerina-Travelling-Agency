import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  "https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI"
)

const form = document.getElementById("loginForm")
const toast = document.getElementById("toast")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  showToast("Logging in...", "bg-blue-100 text-blue-700")

  const email = documentById("email").value
  const password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    showToast(error.message, "bg-red-100 text-red-700")
    return
  }

  // Get role
  const { data: profile } = await supabase 
    .from("agents")
    .select("role")
    .eq("id", data.user.id)
    .single()

  if (profile?.role === "admin") {
    window.location.href = "admin.html"
  } else {
    window.location.href = "agent.html"
  }  
})

function showToast(message, classes) {
  toast.className = `${classes} p-2 rounded`
  toast.textContent = message
  toast.classList.remove("hidden")
}