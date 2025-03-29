
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

// ========== Log Entry UI ==========

document.addEventListener("DOMContentLoaded", () => {
  const todayTab = document.getElementById("today");

  // Log Form
  const logForm = document.createElement("form");
  logForm.innerHTML = \`
    <h3>Quick Log</h3>
    <input type="text" id="logType" placeholder="Type (e.g. mood, meal, med)" required />
    <input type="text" id="logData" placeholder="What happened?" required />
    <button type="submit">Log It</button>
  \`;
  logForm.onsubmit = async (e) => {
    e.preventDefault();
    const type = document.getElementById("logType").value;
    const data = document.getElementById("logData").value;
    await logEvent(type, data);
    logForm.reset();
    alert("Logged!");
  };
  todayTab.appendChild(logForm);

  // Chat UI
  const chatBox = document.createElement("div");
  chatBox.innerHTML = \`
    <h3>Talk to Geist</h3>
    <div id="geistChat" style="background:#111;padding:1rem;height:150px;overflow-y:auto;border:1px solid #333;margin-bottom:1rem;"></div>
    <input type="text" id="geistInput" placeholder="Ask Geist something..." style="width:100%;padding:0.5rem;" />
    <button onclick="submitGeistMessage()">Send</button>
  \`;
  todayTab.appendChild(chatBox);
});

let geistContext = [];

async function submitGeistMessage() {
  const input = document.getElementById("geistInput");
  const message = input.value;
  if (!message) return;

  geistContext.push({ role: "user", content: message });

  const chatDiv = document.getElementById("geistChat");
  const userMsg = document.createElement("div");
  userMsg.textContent = "You: " + message;
  chatDiv.appendChild(userMsg);

  input.value = "Thinking...";

  const reply = await askGeist(message);
  geistContext.push({ role: "assistant", content: reply });

  const aiMsg = document.createElement("div");
  aiMsg.textContent = "Geist: " + reply;
  chatDiv.appendChild(aiMsg);

  input.value = "";
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// ========== OpenAI Integration ==========
async function askGeist(promptText) {
  const apiKey = "YOUR_OPENAI_API_KEY";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: geistContext
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}
