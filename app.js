// База данных. Добавляй свои точки сюда.
const DATA = [
  {
    fish: "Ротан",
    water: "Комариное",
    bait: "кусочки рыбы",
    time: "Утро, день",
    depth: "70-90 см",
    spot: "55:76",
    trophy: "до 400 г"
  },
  {
    fish: "Окунь",
    water: "Комариное",
    bait: "soon",
    time: "soon",
    depth: "soon",
    spot: "soon",
    trophy: "soon"
  },
  {
    fish: "Ёрш",
    water: "Комариное",
    bait: "Навозный червь",
    time: "Ночь",
    depth: "90-120 см",
    spot: "87:87",
    trophy: "до 200 г"
  },
  {
    fish: "Лещ",
    water: "Стрый острог",
    bait: "Гороховая каша",
    time: "Всегда",
    depth: "Клипса 8",
    spot: "10:44",
    trophy: "до 4.2 кг"
  }
];

const resultsEl = document.getElementById("results");
const searchEl = document.getElementById("search");
const waterEl = document.getElementById("waterFilter");
const timeEl = document.getElementById("timeFilter");

// Заполняем список водоёмов
const waters = [...new Set(DATA.map(d => d.water))];
waters.forEach(w => {
  const opt = document.createElement("option");
  opt.value = w;
  opt.textContent = w;
  waterEl.appendChild(opt);
});

function render(items) {
  if (!items.length) {
    resultsEl.innerHTML = "<p style='color:#9fb3c8'>Ничего не найдено.</p>";
    return;
  }
  resultsEl.innerHTML = items.map(d => `
    <div class="card">
      <h3>${d.fish}</h3>
      <div class="row"><span class="label">Водоём</span><span class="value">${d.water}</span></div>
      <div class="row"><span class="label">Наживка</span><span class="value">${d.bait}</span></div>
      <div class="row"><span class="label">Время</span><span class="value">${d.time}</span></div>
      <div class="row"><span class="label">Глубина</span><span class="value">${d.depth}</span></div>
      <div class="row"><span class="label">Точка</span><span class="value">${d.spot}</span></div>
      <div class="row"><span class="label">Трофей</span><span class="value">${d.trophy}</span></div>
    </div>
  `).join("");
}

function filter() {
  const q = searchEl.value.toLowerCase().trim();
  const w = waterEl.value;
  const t = timeEl.value;

  const filtered = DATA.filter(d => {
    const matchQ = !q || d.fish.toLowerCase().includes(q) || d.water.toLowerCase().includes(q);
    const matchW = !w || d.water === w;
    const matchT = !t || d.time === t;
    return matchQ && matchW && matchT;
  });

  render(filtered);
}

searchEl.addEventListener("input", filter);
waterEl.addEventListener("change", filter);
timeEl.addEventListener("change", filter);

render(DATA);