document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    function renderHomePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF5F1F;">Let's Slaughter Crypto</h1>
            <button id="ready-btn" style="background: #FF5F1F; color: white;">I'm ready!</button>
            <button id="not-yet-btn" style="background: #FF1493; color: white;">Not yet</button>
        `;
        document.getElementById("ready-btn").onclick = renderTimePage;
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF1493;">Time Page</h1>
            <input type="text" id="time-input" maxlength="5" placeholder="00:00">
            <button id="time-btn" style="background: #00FF00; color: black;">Time</button>
        `;
        const input = document.getElementById("time-input");
        input.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 2) v = v.substring(0, 2) + ':' + v.substring(2, 4);
            e.target.value = v;
        });
        document.getElementById("time-btn").onclick = () => {
            if(input.value.length === 5) { 
                localStorage.setItem("resetTime", input.value); 
                renderMoneyPage(); 
            }
        };
    }

    function renderMoneyPage() {
        appContainer.innerHTML = `
            <h1 style="color: #00FF00;">Money Page</h1>
            <input type="number" step="0.01" id="money-input" placeholder="0.00">
            <button id="track-btn" style="background: #00FF00; color: black;">$ Enter</button>
        `;
    }

    renderHomePage();
});
