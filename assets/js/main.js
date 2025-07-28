// ========== Clock ==========
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById('liveClock').textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// ========== Tabs ==========
function switchTab(tabId) {
  const tabs = ['clock', 'bookmarks', 'notes', 'weather'];
  tabs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (id === tabId) ? 'block' : 'none';
  });
  localStorage.setItem('lastTab', tabId);
}
document.addEventListener('DOMContentLoaded', () => {
  const lastTab = localStorage.getItem('lastTab') || 'clock';
  switchTab(lastTab);
  restorePositions();
  fetchWeather();
});

// ========== Dragging ==========
function makeDraggable(el) {
  let offsetX, offsetY, isDown = false;
  el.onmousedown = function(e) {
    isDown = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 1000;
  };
  document.onmouseup = () => isDown = false;
  document.onmousemove = function(e) {
    if (!isDown) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
    savePosition(el.id, el.style.left, el.style.top);
  };
}
function savePosition(id, x, y) {
  localStorage.setItem('pos_' + id, JSON.stringify({x, y}));
}
function restorePositions() {
  document.querySelectorAll('.floating').forEach(el => {
    const saved = localStorage.getItem('pos_' + el.id);
    if (saved) {
      const {x, y} = JSON.parse(saved);
      el.style.left = x;
      el.style.top = y;
    }
    makeDraggable(el);
  });
}

// ========== Weather API ==========
function fetchWeather() {
  const url = 'https://wttr.in/?format=j1';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const area = data.nearest_area[0].areaName[0].value;
      const temp = data.current_condition[0].temp_C;
      const cond = data.current_condition[0].weatherDesc[0].value;
      document.getElementById('weatherInfo').innerText = `${area}: ${temp}°C – ${cond}`;
    })
    .catch(err => {
      document.getElementById('weatherInfo').innerText = 'Weather unavailable';
    });
}
