
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabName).style.display = 'block';
}

console.log("Geist is waking up...");

// ========== Onboarding Chat ==========
if (!localStorage.getItem('geistUser')) {
  setTimeout(() => {
    alert("Welcome to Geist. Let’s get to know each other.");
    const name = prompt("What should I call you?");
    const pronouns = prompt("And your pronouns?");
    const vibe = prompt("Describe your vibe in one word.");
    
    const userProfile = {
      name: name,
      pronouns: pronouns,
      vibe: vibe,
      onboardedAt: new Date().toISOString()
    };
    
    localStorage.setItem('geistUser', JSON.stringify(userProfile));
    alert(`Nice to meet you, ${name}. Geist is now synced to your energy.`);
  }, 1000);
}

// ========== Logging Engine ==========

async function logEvent(type, data) {
  const timestamp = new Date().toISOString();
  const location = await getLocation();
  const weather = await getWeather(location?.coords?.latitude, location?.coords?.longitude);

  const log = {
    type,
    data,
    timestamp,
    location,
    weather
  };

  const logs = JSON.parse(localStorage.getItem('geistLogs')) || [];
  logs.push(log);
  localStorage.setItem('geistLogs', JSON.stringify(logs));

  console.log("Logged:", log);
}

// ========== Location Fetch ==========
function getLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ label: "Location unavailable" });
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      }, () => {
        resolve({ label: "Permission denied" });
      });
    }
  });
}

// ========== Weather Fetch ==========
async function getWeather(lat, lon) {
  if (!lat || !lon) return "Weather unavailable";

  try {
    const apiKey = "demo"; // Replace with real weather API key
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      temperature: data.current?.temperature_2m,
      code: data.current?.weathercode
    };
  } catch (error) {
    return "Weather fetch failed";
  }
}
