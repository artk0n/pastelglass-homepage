
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = sidebar.style.width === "60px" ? "220px" : "60px";
}
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

function addTask() {
  const task = document.getElementById("new-task").value;
  if (task.trim()) {
    const li = document.createElement("li");
    li.innerHTML = '<input type="checkbox"> ' + task;
    document.getElementById("todo-list").appendChild(li);
    document.getElementById("new-task").value = "";
  }
}
