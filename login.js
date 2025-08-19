import { supabase } from "./supabaseClient.js";

document.getElementById("LoginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { loginData, error } = await supabase.auth.singInWithPassword({ email, password });

  if (error) {
    alert("❌ Login failed: " + error.message);
    return;
  } 

  // Fetch user role
  const userId = loginData.user.id;
  const { data: agentData, error: roleError } = await supabase
    .from("agents")
    .select("role")
    .eq("id", userId)
    .single();

  if (roleError || !agentData) {
    alert("Could not fetch role. Defaulting to agent.");
    window.location.href = "agent.html";
    return;
  }  

  if (agentData.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "agent.html";
  }
});