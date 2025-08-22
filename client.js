import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI")
const grid = document.getElementById("clientPackageGrid")

async function bookPackage(packageId) {
  showLoader()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    hideLoader()
    return showToast("Please log in to book", "error")
  }

  const { error } = await supabase.from("bookings").insert([{
    client_id: user.id,
    package_id: packageId
  }])

  hideLoader()
  if (error) return showToast(error.message, "error")

  showToast("Booking request sent!", "success")
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"  
})