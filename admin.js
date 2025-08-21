import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  "https://xduxoyahnrlbuygkrsli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkdXhveWFobnJsYnV5Z2tyc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQwNTUsImV4cCI6MjA3MTEyMDA1NX0.afSb99piQN8ulHAP_TElR1s4rg_k4shS8R1lTh6EVQI"
)

const tableBody = document.getElementById("adminPackageList")
const logoutBtn = document.getElementById("logoutBtn")

// Ensure user is logged in
supabase.auth.getUser().then(async ({ data: { user } }) => {
  if (!user) window.location.href = "login.html"
  else await loadPackages()
})

async function loadPackages() {
  tableBody.innerHTML = `<tr><td colspan="4" class="p-3 text-gray-500">Loading...</td></tr>`

  const { data, error } = await supabase
    .from("packages")
    .select("title, description, price, agent_id, agents(name)")

  if (error) {
    tableBody.innerHTML = `<tr><td colspan="4" class="p-3 text-red-600">${error.message}</td></tr>`
    return
  }  

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="p-3 text-gray-500">No packages available</td></tr>`
    return 
  }

  tableBody.innerHTML = data.map(pkg => `
    <tr class="hover:bg-gray-50">
      <td class="p-3">${pkg.title}</td>
      <td class="p-3 text-sm text-gray-600">${pkg.description}</td>
      <td class="p-3">$${pkg.price}</td>
      <td class="p-3">${pkg.agents?.name || pkg.agent_id}</td>
    </tr>
  `).join("")
}

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"
})