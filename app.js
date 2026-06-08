document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    // --- SCANNER ENGINE ---
    async function fetchScannerData() {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
            const data = await response.json();
            const usdtPairs = data.filter(item => item.symbol.endsWith('USDT'));
            const topPerformer = usdtPairs.reduce((prev, current) => 
                (parseFloat(prev.priceChangePercent) > parseFloat(current.priceChangePercent)) ? prev : current
            );
            return {
                symbol: topPerformer.symbol,
                price: parseFloat(topPerformer.lastPrice).toFixed(4),
                change: parseFloat(topPerformer.priceChangePercent).toFixed(2)
            };
        } catch (error) {
            return { symbol: "Error", price: "0.00", change: "0.00" };
        }
    }

    // --- PAGE RENDERING ---
    function renderHomePage() {
        appContainer.innerHTML = `
            <div id="welcome-text">Welcome!</div>
            <div id="main-header">Let's <span style="color: #FF5F1F;">Slaughter Crypto</span></div>
            <button class="tab ready-btn" id="ready-tab">I'm ready!</button>
            <button class="tab not-yet-btn" id="not-yet-tab">Not yet</button>
        `;
        document.getElementById("ready-tab").addEventListener("click", renderTimePage);
        document.getElementById("not-yet-tab").addEventListener("click", () => {
            appContainer.innerHTML = '<h1 style="color: #FF5F1F; text-align: center;">Application Closed</h1>';
        });
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF1493; text-align: center;">Time Page</h1>
            <p style="text-align: center; color: white;">Enter reset time (24h format):</p>
            <input type="text" id="time-input" maxlength="5" placeholder="00:00" style="display:block; margin: 0 auto; width: 80px; text-align: center; font-size: 18px;">
            <button class="tab" id="next-tab" style="display:block; margin: 20px auto;">Time</button>
        `;
        const input = document.getElementById("time-input");
        input.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 2) v = v.substring(0, 2) + ':' + v.substring(2, 4);
            e.target.value = v;
        });
        document.getElementById("next-tab").addEventListener("click", () => {
            if(input.value.length === 5) {
                localStorage.setItem("resetTime", input.value);
                renderMoneyPage();
            }
        });
    }

    function renderMoneyPage() {
        appContainer.innerHTML = `
            <h1 style="color: #00FF00; text-align: center;">Money Page</h1>
            <p style="text-align: center; color: white;">Investment amount (e.g. 10.00):</p>
            <input type="number" step="0.01" id="money-input" placeholder="0.00" style="display:block; margin: 0 auto; width: 150px; text-align: center;">
            <button class="tab" id="track-tab" style="display:block; margin: 20px auto;">$ Enter</button>
        `;
        document.getElementById("track-tab").addEventListener("click", () => {
            const m = document.getElementById("money-input").value;
            if(m) {
                localStorage.setItem("investment", m);
                renderResultsPage();
            }
        });
    }

    async function renderResultsPage() {
        const inv = parseFloat(localStorage.getItem("investment") || 0);
        const scanner = await fetchScannerData();
        
        appContainer.innerHTML = `
            <h2 style="color: #FF1493; text-align: center;">Results</h2>
            <div style="display: flex; justify-content: space-between; color: white; font-size: 14px;">
                <div style="text-align: left;">
                    <div>Reset: ${localStorage.getItem("resetTime")}</div>
                    <div>Inv: $${inv.toFixed(2)}</div>
                    <br>
                    <div>Currency: ${scanner.symbol}</div>
                    <div>Price: $${scanner.price}</div>
                    <div>24h: ${scanner.change}%</div>
                </div>
                <div style="text-align: right; width: 120px;">
                    <button id="time-reset-tab" style="width:100%; margin-bottom:5px;">Time reset</button>
                    <button id="money-reset-tab" style="width:100%; margin-bottom:5px;">$$ Reset $$</button>
                    <button id="new-pick-tab" style="width:100%;">New pick</button>
                </div>
            </div>
        `;
        document.getElementById("money-reset-tab").addEventListener("click", renderMoneyPage);
        document.getElementById("time-reset-tab").addEventListener("click", () => { localStorage.clear(); renderHomePage(); });
        document.getElementById("new-pick-tab").addEventListener("click", renderResultsPage);
    }

    renderHomePage();
});
