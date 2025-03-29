# # Geist — Spectral AI Web App

**Geist** is a personalized, spectral AI assistant designed as a dark-mode iOS web app for holistic life support. It blends OpenAI-powered companionship with task tracking, health and wellness logging, and creative organization—all wrapped in a glitchy, ethereal interface. Geist adapts to the user over time, quietly building an intelligent memory system through every interaction.

---

## Features

### Modular Tabs
- `Today`: Daily dashboard (routines, streaks, reminders, active tasks)
- `Health`: Food logs, digestion, symptoms, meds, moods (with background conditions)
- `Wellness`: Mindfulness, sobriety, sleep, mental health check-ins
- `Fitness`: Custom workouts, Apple Watch stats, outdoor gym sessions
- `Creativity`: Music, modeling, outfit planner, recipes, memos
- `Social`: Snapchat streaks, calendar, birthdays, personal notes

---

## Passive Intelligence Engine

All entries—regardless of category—are automatically background-logged with:
- **Verified Timestamp** (cross-checked with online atomic time)
- **Day + Date** (for cyclical tracking and pattern recognition)
- **Real-Time Location** (GPS coordinates + user-defined labels)
- **Weather Conditions** (retrieved live at time of log)
- **Context Awareness** (e.g. "at mum’s house", "post-run", "before bed")

These details are stored silently unless relevant (e.g. sudden weather change, unusual time of activity, change of location). Geist uses this metadata to inform future insights, reminders, and suggestions.

---

## Onboarding Experience

- First-run guided chat shapes Geist’s personality and memory core
- Defines user's routines, priorities, and tone preferences
- All stored locally for offline-first use

---

## Offline Support

- Full PWA setup with `manifest.json` and `service-worker.js`
- Optimized for iOS Home Screen installation
- LocalStorage and/or IndexedDB used for persistence

---

## AI + Context Memory

- OpenAI GPT API for natural conversation and assistant interaction
- Prompts shaped by user data, routines, and personality
- Geist evolves its tone and behavior based on user input

---

## Setup

1. Clone the repo
2. Install any dependencies (if applicable)
3. Replace placeholder assets:
   - `/assets/logo.png`
   - `/assets/fonts/`
   - `/assets/splash/`
4. Add OpenAI API key to `.env` or config
5. Serve `index.html` locally or deploy to GitHub Pages

---

## Location + Environment Logging

- Uses `navigator.geolocation` for live coordinates
- Reverse geocoded into user-friendly labels
- Learns frequent places and allows renaming (e.g. "Dad’s flat")
- Weather data pulled via OpenWeather or similar API
- Logs all contextual data in background, timestamped per entry

---

## Tasks for Copilot

- Modular tab system with visual routing
- Silent metadata logging per action (timestamp, weather, GPS)
- Onboarding chat with persistent memory
- Natural GPT-driven assistant replies using user profile
- UI styling with glitch/dark/tribal aesthetic
- Optional voice input or quick-log buttons for routine entries
- Charting/log review interface (lightweight JS visualization lib)

---

## Future Goals

- Native iOS Bridge App (Swift) for:
  - Apple HealthKit (workouts, vitals, sleep)
  - HomeKit (room states, environment triggers)
- Push Notifications via Safari or native
- GPT fine-tuning loop with anonymized user logs
- Monthly mental health + wellness content injection

---

## License

Private project. Not intended for public distribution or use.
