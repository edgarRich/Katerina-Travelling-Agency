import { supabase } from "./supabaseClient.js";

document.getElementById("LoginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.singInWithPassword({ email, password });

  if (error) {
    alert("❌ Login failed: " + error.message);
  } else {
    alert("✅ Welcome back!");
    // Redirect based on role later
    window.location.href = "agent.html";
  }
});