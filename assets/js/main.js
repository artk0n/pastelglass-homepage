
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
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
function setBackground(mode) {
  const vid = document.getElementById('bg-video');
  if (mode === 0) {
    document.body.style.background = "url('https://picsum.photos/1920/1080') center/cover";
    vid.style.display = 'none';
  } else if (mode === 1) {
    document.body.style.background = "none";
    vid.src = "https://www.w3schools.com/howto/rain.mp4";
    vid.style.display = 'block';
  } else {
    document.body.style.background = "";
    vid.style.display = 'none';
  }
}
function fetchWeather() {
  fetch('https://api.weatherapi.com/v1/current.json?key=demo&q=auto:ip')
    .then(res => res.json())
    .then(data => {
      const out = `${data.location.name}: ${data.current.temp_c}°C, ${data.current.condition.text}`;
      document.getElementById("weather").innerText = out;
    })
    .catch(() => document.getElementById("weather").innerText = "Weather API limit reached.");
}
fetchWeather();
