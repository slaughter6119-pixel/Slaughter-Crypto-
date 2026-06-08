document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    function renderHomePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF5F1F;">Let's Slaughter Crypto</h1>
            <button id="ready-btn" style="background: #FF5F1F; color: white;">I'm ready!</button>
            <button id="not-yet-btn" style="background: #FF1493; color: white;">Not yet</button>
        `;
        document.getElementById("ready-btn").onclick = renderTimePage;
        document.getElementById("not-yet-btn").onclick = () => { appContainer.innerHTML = ''; };
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF1493;">Time Page</h1>
            <input type="text" id="time-input" maxlength="5" placeholder="00:00" style="border: 1px solid white; background: black; color: white; padding: 10px; font-size: 24px; text-align: center; width: 100px;">
            <button id="time-btn" style="background: #00FF00; color: black;">Time</button>
        `;
        const input = document.getElementById("time-input");
        input.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 2) v = v.substring(0, 2) + ':' + v.substring(2, 4);
            e.target.value = v;
        });
        document.getElementById("time-btn").onclick = () => {
            if(input.value.length === 5) { localStorage.setItem("resetTime", input.value); renderMoneyPage(); }
        };
    }

    function renderMoneyPage() {
        appContainer.innerHTML = `
            <h1 style="color: #00FF00;">Money Page</h1>
            <div class="input-wrapper"><span style="color:white; font-size:24px;">$</span><input type="number" step="0.01" id="money-input" placeholder="0.00"></div>
            <button id="track-btn" style="background: #00FF00; color: black;">$ Enter</button>
        `;
        document.getElementById("track-btn").onclick = () => {
            const m = document.getElementById("money-input").value;
            if(m) { localStorage.setItem("investment", m); renderResultsPage(); }
        };
    }

    function renderResultsPage() {
        const inv = parseFloat(localStorage.getItem("investment") || 0);
        appContainer.innerHTML = `
            <h1 style="color: #FF1493;">Results</h1>
            <div style="text-align:left; width:100%; color:white; font-size:18px;">
                <div>Reset time- ${localStorage.getItem("resetTime")}</div>
                <div>Investment entered- $${inv.toFixed(2)}</div>
                <div style="color:#00FF00;">Profit expected- $${(inv * 0.1).toFixed(2)}</div>
                <br>
                <div style="color:#FF1493;">Currency- Determining...</div>
                <div style="color:#8A2BE2;">Current- Determining...</div>
                <div style="color:#008080;">Buy- Determining...</div>
                <div style="color:#008000;">Sell- Determining...</div>
                <br>
                <div style="color:#008080;">Todays- Determining...</div>
                <div style="color:#8A2BE2;">Total- Determining...</div>
            </div>
            <button id="reset-btn" style="background:#CC0000; color:white; margin-top:20px;">Time reset</button>
        `;
        document.getElementById("reset-btn").onclick = () => { localStorage.clear(); location.reload(); };
    }
    renderHomePage();
});
