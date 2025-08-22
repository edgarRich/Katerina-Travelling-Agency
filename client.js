import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI")
const grid = document.getElementById("clientPackageGrid")

async function loadAvailablePackages() {
  showLoader()
  const { data, error } = await supabase.from("packages").select("*")
  hideLoader()

  if (error) return showToast(error.message, "error")

  list.innerHTML = data.map(pkg => `
    <li class="p-3 border-b hover:bg-gray-50 transition">
      <div class="font-bold">${pkg.title}</div>
      <div class="text-sm text-gray-600">${pkg.description}</div>
      <div class="text-sm text-gray-800">$${pkg.price}</div>
      <button class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
        Book Now
      </button>
    </li>
  `).join("")
}

loadPackages()

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"  
})