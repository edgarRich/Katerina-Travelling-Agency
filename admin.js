import { supabase } from "./supabaseClient.js";

async function loadTasks() {
  const { data, error } = await supabase.from("tasks").select(`
    id, client_name, status, created_at,
    agents (full_name)
  `);

  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.client_name} - ${task.status} (Agent: ${task.agents?.full_name || "N/A"})`;
    list.appendChild(li); 
  });
}

loadTasks();