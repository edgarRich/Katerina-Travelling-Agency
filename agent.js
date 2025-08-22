import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI"
)

const form = document.getElementById("packageForm")
const list = document.getElementById("packageList")
const logoutBtn = document.getElementById("logoutBtn")

// Ensure user is logged in
supabase.auth.getUser().then(({ data: { user } }) => {
  if (!user) window.location.href = "login.html"
  else loadPackages(user.id)
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  showLoader()

  const title = document.getElementById("title").value 
  const description = document.getElementById("description").value 
  const price = document.getElementById("price").value

  const { error } = await supabase.from("packages").insert([{
    title, descritption, price,
    agent_id: (await supabase.auth.getUser()).data.user.id
  }])

  hideLoader()

  if (error) return showToast(error.message, "error")

  showToast("Package added successfully!", "success")
  form.reset()
  loadPackages((await supabase.auth.getUser()).data.user.id)
})

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"
})