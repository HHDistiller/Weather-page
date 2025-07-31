const apiKey = '40b2e27c41beba54baaf70cacd50acb6';  // ✅ Your actual API key
const zip = '40047';  // 📍 Mount Washington ZIP

async function getWeatherData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      temp: data.main.temp,
      feels: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      weather: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      uv: 8  // 📊 Static UV for now—can upgrade later
    };

  } catch (err) {
    console.error("❌ Error fetching weather data:", err);
    return null;
  }
}

async function switchMode(mode) {
  const w = await getWeatherData();
  if (!w) {
    document.getElementById('output').textContent = "⚠️ Could not retrieve weather data.";
    return;
  }

  let msg = `📡 Conditions: ${w.description}, ${w.temp}°F, Humidity: ${w.humidity}%, Wind: ${w.wind} mph\n`;

  if (mode === 'swim') {
    msg += "🏊 Swim Mode:\n";
    if (w.temp > 80 && w.wind < 10) msg += "✅ Great swim weather—warm & calm.\n";
    else msg += "🔻 Not ideal—wind or cool temps.\n";
    if (w.uv >= 8) msg += "☀️ Sunburn danger high—SPF or toast.\n";
  }

  else if (mode === 'repair') {
    msg += "🛠️ Repair Mode:\n";
    if (w.humidity > 60 || w.wind > 12)
      msg += "⚠️ High humidity or wind—soldering may suffer.\n";
    else
      msg += "✅ Good for outdoor electronics.\n";
  }

  else if (mode === 'dress') {
    msg += "🧥 Dress & Drama:\n";
    if (w.temp < 50) msg += "🧊 Bundle up—cold day.\n";
    else if (w.temp > 85) msg += "🔥 Hot—dress light.\n";
    if (w.weather.includes("rain")) msg += "🌧️ Soggy Socks Alert!\n";
    if (w.humidity > 70 && w.wind > 10) msg += "💨 Bad Hair Day incoming.\n";
  }

  document.getElementById('output').textContent = msg;
}

function playNWS() {
  window.open('https://noaaweatherradio.org/live', '_blank');
}

function showRadar() {
  window.open(`https://radar.weather.gov/?zone=${zip}`, '_blank');
}
