document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    function renderHomePage() {
        appContainer.innerHTML = `
            <div id="welcome-text">Welcome!</div>
            <div id="main-header" style="color: #FF5F1F;">Let's Slaughter Crypto</div>
            <button id="ready-tab" style="background: #FF5F1F; color: white; width: 100%; padding: 15px; margin-bottom: 10px;">I'm ready!</button>
            <button id="not-yet-tab" style="background: #FF1493; color: white; width: 100%; padding: 15px;">Not yet</button>
        `;
        document.getElementById("ready-tab").onclick = renderTimePage;
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF1493; text-align: center;">Time Page</h1>
            <input type="text" id="time-input" maxlength="5" placeholder="00:00" style="display:block; margin: 0 auto; width: 100px; text-align: center; background: black; color: white; border: 2px solid #FF1493;">
            <button id="next-tab" style="background: #00FF00; color: black; width: 100%; margin-top: 20px; padding: 15px;">Time</button>
        `;
        document.getElementById("next-tab").onclick = () => {
            const val = document.getElementById("time-input").value;
            if(val.length === 5) { localStorage.setItem("resetTime", val); renderMoneyPage(); }
        };
    }

    function renderMoneyPage() {
        appContainer.innerHTML = `
            <h1 style="color: #00FF00; text-align: center;">Money Page</h1>
            <input type="number" step="0.01" id="money-input" placeholder="0.00" style="display:block; margin: 0 auto; width: 150px; text-align: center; background: black; color: white; border: 2px solid #00FF00;">
            <button id="track-tab" style="background: #00FF00; color: black; width: 100%; margin-top: 20px; padding: 15px;">$ Enter</button>
        `;
        document.getElementById("track-tab").onclick = () => {
            const m = document.getElementById("money-input").value;
            if(m) { localStorage.setItem("investment", m); renderResultsPage(); }
        };
    }

    function renderResultsPage() {
        appContainer.innerHTML = `
            <h2 style="color: #FF1493; text-align: center;">Results</h2>
            <div style="color: white;">Reset time- ${localStorage.getItem("resetTime")}</div>
            <button id="time-reset-tab" style="background: #CC0000; color: white; width: 100%;">Time reset</button>
        `;
        document.getElementById("time-reset-tab").onclick = () => { localStorage.clear(); renderHomePage(); };
    }

    renderHomePage();
});
