import { createClient } from "https://esm.sh@supabase/supabase-js"

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI")

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value 
  const password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    showToast(error.messsage, "error")
  } else {
    showToast("Login successful!", "success")
  }

  alert("Check your email for confirmation link!")
  window.location.href = "login.html"  
})  