import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI")
const grid = document.getElementById("clientPackageGrid")

async function loadMyBookings() {
  const { data: user } = await supabase.auth.getUser()
  const { data } = await supabase.from("bookings")
    .select("*, packages(title, price)")
    .eq("client_id", user.user.id)

  myBookingsList.innerHTML = data.map(b => `
    <li>${b.packages.title} - ${b.status} - $${b.packages.price}</li>
  `).join("")
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"  
})