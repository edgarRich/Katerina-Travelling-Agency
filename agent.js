import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  "https://xduxoyahnrlbuygkrsli.supabase.co",
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

  const title = document.getElementById("title").value 
  const descritpion = document.getElementById("description").value 
  const price = document.getElementById("price").value 

  const { data, error } = await supabase.from("packages").insert([{
    title,
    description,
    price,
    agent_id: (await supabase.auth.getUser()).data.user.id 
  }])

  if (error) {
    alert("Error: " + error.message)
    return 
  }

  alert("Package added!")
  form.reset()
  loadPackages((await supabase.auth.getUser()).data.user.id)
})

async function loadPackages(agentId) {
  list.innerHTML = "<li class=`p-3 text-gray-500`>Loading...</li>"

  const { data, error } = await supabase 
    .from("packages")
    .select("*")
    .eq("agent_id", agentId)

  if (error) {
    list.innerHTML = `<li class='p-3 text-red-600'>${error.message}</li>`
    return 
  }  

  if (data.length === 0) {
    list.innerHTML = "<li class='p-3 text-gray-500'>No packages yet</li>"
    return 
  }

  list.innerHTML = data.map(pkg => `
    <li class="p-3 hover:bg-gray-50">
    <div class="font-semibold">${pkg.title}</div>
    <div class="text-sm text-gray-600">${pkg.description}</div>
    <div classs="text-sm text-gray-800">$$[pkg.price]</div>
    </li>
  `).join("")
}

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "login.html"
})