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

  showLoader()
  const { data, error } = await supabase.from("packages").select("*")
  hideLoader()

  if (error) return showToast(error.message, "error")

  FileList.innerHTML = data.map(pkg => `
    <li class="p-3 border-b">
      <strong>${pkg.title}</strong> - $${pkg.price} <br>
      <span class="text-gray-600">${pkg.description}</span>
      </li>
    `).join("")
}

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"
});