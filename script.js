const API_KEY = "4fb057e1e61d3dd92a6883d7a8676903";

async function loadMatches() {
  const league = document.getElementById("league").value;

  const url =
    "https://v3.football.api-sports.io/fixtures?date=" +
    new Date().toISOString().split("T")[0];

  const res = await fetch(url, {
    headers: {
      "x-apisports-key": API_KEY
    }
  });

  const data = await res.json();

  const container = document.getElementById("matches");
  container.innerHTML = "";

  data.response.forEach(m => {
    if (league !== "all" && !m.league.name.includes(league)) return;

    const div = document.createElement("div");
    div.className = "card";

    const status = m.fixture.status.short;
    const score =
      m.goals.home + " - " + m.goals.away;

    div.innerHTML = `
      🏆 ${m.league.name}<br>
      ⚽ ${m.teams.home.name} vs ${m.teams.away.name}<br>
      ⏰ ${m.fixture.date.slice(11,16)}<br>
      <div class="score">🔴 ${status === "FT" ? "FINI" : score}</div>
    `;

    container.appendChild(div);
  });
}

// 🔥 auto refresh toutes les 60 secondes
loadMatches();
setInterval(loadMatches, 60000);

