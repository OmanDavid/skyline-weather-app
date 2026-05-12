# ☁ Weather App

A React weather app .Type any city name and get live weather data real-time web search.

---

## How it works

```
Browser → POST /api/weather → Express server → Anthropic API (Claude + web search) → back to browser
```

The Express server sits in the middle so your **API key is never exposed to the browser**.

---

## Project structure

```
weather-app/
├── index.html                  ← Single HTML page that hosts React
├── vite.config.js              ← Build tool config (proxies /api to Express)
├── package.json                ← Project dependencies and scripts
├── .env.example                ← Template for environment variables
├── .gitignore                  ← Files git should never commit (.env, node_modules)
│
├── server/
│   └── index.js                ← Express backend — calls Anthropic API securely
│
└── src/
    ├── main.jsx                ← Entry point — mounts React into index.html
    ├── App.jsx                 ← Root component — owns all state
    ├── index.css               ← Global styles and animation keyframes
    │
    ├── components/
    │   ├── SearchBar.jsx       ← Text input + search button
    │   ├── WeatherCard.jsx     ← Displays city, temperature, stats
    │   └── StatusMessage.jsx   ← Idle / loading / error messages
    │
    └── utils/
        └── weatherIcon.js      ← Maps condition strings to emoji icons
```

---

## Prerequisites

- **Node.js 18+** — [download here](https://nodejs.org)
- An **Anthropic API key** — [get one here](https://console.anthropic.com/settings/keys)

---

## Setup (step by step)

### 1 — Clone or download the project

```bash
git clone <your-repo-url>
cd weather-app
```

### 2 — Install dependencies

This downloads all packages listed in `package.json` into a `node_modules/` folder.

```bash
npm install
```

### 3 — Create your `.env` file

Copy the example file and add your real API key.

```bash
cp .env.example .env
```

Open `.env` in your editor and replace the placeholder:

```
ANTHROPIC_API_KEY=sk-ant-your-real-key-here
PORT=3001
```

> ⚠️ Never commit `.env` to git. It's already in `.gitignore`.

### 4 — Start the app

This single command starts both the React frontend and the Express backend at the same time.

```bash
npm run dev
```

You should see:

```
✅ Weather API server running on http://localhost:3001
VITE ready on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Available scripts

| Command           | What it does                                    |
|-------------------|-------------------------------------------------|
| `npm run dev`     | Starts frontend + backend together (development)|
| `npm run build`   | Compiles React for production into `/dist`      |
| `npm run preview` | Previews the production build locally           |

---

## Troubleshooting

**"Could not reach the server"**
→ Make sure the Express server started. Check the terminal for `✅ Weather API server running`.

**"Failed to reach the AI service"**
→ Check your `ANTHROPIC_API_KEY` in `.env`. Make sure there are no extra spaces.

**Port already in use**
→ Change `PORT=3001` in `.env` to another port, e.g. `3002`. Vite's proxy in `vite.config.js` will need to match.

---

## Key concepts (for junior developers)

| Concept | Where to see it |
|---|---|
| `useState` hook | `src/App.jsx` |
| Controlled inputs | `src/components/SearchBar.jsx` |
| Props & callbacks | `App.jsx` → `SearchBar.jsx` |
| Async/await fetch | `src/App.jsx` → `fetchWeather()` |
| Conditional rendering | `src/App.jsx` → JSX return |
| Pure utility function | `src/utils/weatherIcon.js` |
| Express route handler | `server/index.js` |
| Environment variables | `server/index.js` + `.env` |
