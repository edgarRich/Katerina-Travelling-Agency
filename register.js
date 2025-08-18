document.getElementByID("registerForm").addEventListener("submit", e=> {
  e.preventDefault();
  alert("Registered successfully (connect to supabase here).");
});