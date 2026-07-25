const API_URL = "https://api.open-meteo.com/v1/forecast";

class CurrentWeather extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.lat = null;
    this.lon = null;
  }

  connectedCallback() {
    const a = this.getAttribute("latitude");
    const b = this.getAttribute("longitude");
    if (a && b) {
      this.lat = a;
      this.lon = b;
      this.fetchWeather();
    } else {
      this.loading();
      navigator.geolocation.getCurrentPosition(
        (p) => {
          this.lat = p.coords.latitude;
          this.lon = p.coords.longitude;
          this.fetchWeather();
        },
        () => this.error("Location permission denied."),
      );
    }
  }

  icon(code) {
    if (code === 0) return "☀️";
    if ([1, 2].includes(code)) return "🌤️";
    if (code === 3) return "☁️";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️";
    if ([71, 73, 75].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌍";
  }

  loading() {
    this.shadowRoot.innerHTML = `<style>${this.css()}</style>
 <div class="card shadow p-4 text-center">
 <div class="spinner-border text-primary"></div>
 <p class="mt-3">Loading weather...</p></div>`;
  }

  async fetchWeather() {
    this.loading();
    try {
      const url = `${API_URL}?latitude=${this.lat}&longitude=${this.lon}&current_weather=true`;
      const res = await fetch(url);
      if (!res.ok) throw Error();
      const data = await res.json();
      this.render(data.current_weather);
    } catch (e) {
      this.error("Unable to retrieve weather.");
    }
  }

  render(w) {
    this.shadowRoot.innerHTML = `<style>${this.css()}</style>
 <div class="card shadow weather-card">
 <div class="card-body text-center">
 <div class="display-3">${this.icon(w.weathercode)}</div>
 <h2>${w.temperature}&deg;C</h2>
 <p class="text-muted">Lat: ${Number(this.lat).toFixed(4)} | Lon: ${Number(this.lon).toFixed(4)}</p>
 <table class="table table-sm">
 <tr><th>Wind</th><td>${w.windspeed} km/h</td></tr>
 <tr><th>Direction</th><td>${w.winddirection}&deg;</td></tr>
 <tr><th>Code</th><td>${w.weathercode}</td></tr>
 <tr><th>Updated</th><td>${w.time}</td></tr>
 </table>
 <button class="btn btn-primary">Refresh</button>
 </div></div>`;
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", () => this.fetchWeather());
  }

  error(msg) {
    this.shadowRoot.innerHTML = `<style>${this.css()}</style>
 <div class="alert alert-danger">${msg}</div>`;
  }

  css() {
    return `
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css');
.weather-card{max-width:420px;border-radius:16px}
table{margin-top:1rem}
`;
  }
}
customElements.define("current-weather", CurrentWeather);
