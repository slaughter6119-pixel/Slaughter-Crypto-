document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    function renderHomePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF5F1F; text-align: center;">Let's Slaughter Crypto</h1>
            <button id="ready-btn" style="background: #FF5F1F;">I'm ready!</button>
            <button id="not-yet-btn" style="background: #FF1493;">Not yet</button>
        `;
        document.getElementById("ready-btn").onclick = renderTimePage;
        document.getElementById("not-yet-btn").onclick = () => { window.location.reload(); };
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF1493; text-align: center;">Time Page</h1>
            <input type="text" id="time-input" maxlength="5" placeholder="00:00" style="border: 1px solid white; background: black; color: white; padding: 10px; font-size: 24px; text-align: center; width: 100px; margin: 0 auto; display: block;">
            <button id="time-btn" style="background: #00FF00; color: black; margin-top: 20px;">Time</button>
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
            <h1 style="color: #00FF00; text-align: center;">Money Page</h1>
            <div class="input-wrapper" style="margin: 0 auto;"><span style="color:white; font-size:24px;">$</span><input type="number" step="0.01" id="money-input" placeholder="0.00"></div>
            <button id="track-btn" style="background: #00FF00; color: black; margin-top: 20px;">$ Enter</button>
        `;
        document.getElementById("track-btn").onclick = () => {
            const m = document.getElementById("money-input").value;
            if(m) { localStorage.setItem("investment", m); renderResultsPage(); }
        };
    }

    function renderResultsPage() {
        const inv = parseFloat(localStorage.getItem("investment") || 0);
        appContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
                <div style="text-align:left; color:white; font-size:14px; line-height: 1.5;">
                    <h1 style="color: #FF1493; margin: 0;">Results</h1>
                    <div style="color:#8A2BE2;">Reset time- ${localStorage.getItem("resetTime")}</div>
                    <div style="color:#FF1493;">Investment entered- $${inv.toFixed(2)}</div>
                    <div style="color:#00FF00;">Profit expected- $${(inv * 0.1).toFixed(2)}</div>
                    <div style="color:#FF1493;">Currency- Determining...</div>
                    <div style="color:#8A2BE2;">Current- Determining...</div>
                    <div style="color:#008080;">Buy- Determining...</div>
                    <div style="color:#008000;">Sell- Determining...</div>
                    <div style="color:#008080;">Todays- Determining...</div>
                    <div style="color:#8A2BE2;">Total- Determining...</div>
                </div>
                <div style="width: 110px;">
                    <div style="color:#FF4500; font-size: 14px; text-align: center; margin-bottom: 5px;">Accuracy</div>
                    <button id="btn1">Time reset</button>
                    <button id="btn2">$$ Reset $$</button>
                    <button id="btn3">New pick</button>
                </div>
            </div>
        `;
        document.getElementById("btn1").onclick = () => { localStorage.clear(); location.reload(); };
        document.getElementById("btn2").onclick = renderMoneyPage;
        document.getElementById("btn3").onclick = renderResultsPage;
    }
    renderHomePage();
});
