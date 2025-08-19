import { supabase } from "./supabaseClient.js";

document.getElementById("registerForm").addEventListener("submit", async e => {
  e.preventDefault();
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Supabase signup
  const { data, error } = await supabase.auth.signup ({
    email,
    password,
    options: {
      data: { full_name: fullname }
    }
  });

  if (error) {
    alert ("❌ Registration failed: " + error.message);
  } else {
    alert("✅ Registration successful! Please check your email.");
    window.location.href = "login.html"; 
  }
});