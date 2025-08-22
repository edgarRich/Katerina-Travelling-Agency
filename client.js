import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient("https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI")
const grid = document.getElementById("clientPackageGrid")

async function loadPackages() {
  grid.innerHTML = "<p class='col-span-3 text-gray-500'>Loading...</p>"
  
  const { data, error } = await supabase.from("packages").select("*")

  if (error) {
    grid.innerHTML = `<p class='col-span-3 text-red-600'>${error.message}</p>`
    return
  }

  grid.innerHTML = data.map(pkg =>`
    <div class="bg-white shadow rounded p-6 hover:shadow-lg">
      <h3 class="font-semibold text-lg">${pkg.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${pkg.description}</p>
      <p class="font-bold">$${pkg.price}</p>
      <button class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Book</button>
    </div>
  `).join("")
}

loadPackages()

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"  
})