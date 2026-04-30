const API_KEY = "TON_API_KEY_ICI";

document.getElementById("date").innerText =
  "📅 " + new Date().toLocaleDateString();

async function loadMatches() {
  const url = "https://v3.football.api-sports.io/fixtures?date=" +
    new Date().toISOString().split("T")[0];

  const res = await fetch(url, {
    headers: { "x-apisports-key": API_KEY }
  });

  const data = await res.json();

  const container = document.getElementById("matches");
  container.innerHTML = "";

  data.response.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML =
      "🏆 " + m.league.name + "<br>" +
      "⚽ " + m.teams.home.name + " vs " + m.teams.away.name + "<br>" +
      "⏰ " + m.fixture.date.slice(11,16);

    container.appendChild(div);
  });
}

loadMatches();
