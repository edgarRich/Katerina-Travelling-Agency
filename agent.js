import { supabase } from "./supabaseClient.js";

document.getElementById("packageForm").addEventListener("submit", async e => {
  e.preventDefault();
  const desc = document.getElementById("packageDesc").value;
  const dest = document.getElementById("destination").value;
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("❌ You must log in as an agent.");
    window.location.href = "login.html";
    return;
  }

  const { error } = await supabase.from("packages").insert([
    { agent_id: user.id, description: desc, destination: dest }
  ]);

  if (error) {
    alert("❌ Could not add package: " + error.message);
  } else {
    alert("✅ Package registered!");
    document.getElementById("packageForm").reset();
  }
});