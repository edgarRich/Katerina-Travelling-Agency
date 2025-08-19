const taskList = document.getElementById("taskList");
[]
  .forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });