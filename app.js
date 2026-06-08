document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");
    renderHomePage();

    function renderHomePage() {
        appContainer.innerHTML = `
            <div id="welcome-text">Welcome!</div>
            <div id="main-header">Let's <span style="color: #FF5F1F;">Slaughter Crypto</span></div>
            <div class="tab ready-btn" id="ready-tab">I'm ready!</div>
            <div class="tab not-yet-btn" id="not-yet-tab">Not yet</div>
        `;
        document.getElementById("ready-tab").addEventListener("click", renderTimePage);
        document.getElementById("not-yet-tab").addEventListener("click", () => {
            document.body.innerHTML = '<h1 style="color: #FF5F1F; text-align: center; margin-top: 50px;">Application Closed</h1>';
        });
    }

    // --- SCANNER ENGINE ---
    async function fetchScannerData() {
        try {
            // Fetching 24hr statistics from Binance
            const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
            const data = await response.json();
            
            // Filtering for USDT pairs and finding the one with highest priceChangePercent
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
            console.error("Scanner Error:", error);
            return { symbol: "Error", price: "0.00", change: "0.00" };
        }
    }

    async function renderResultsPage() {
        const inv = parseFloat(localStorage.getItem("investment") || 0);
        // Load scanner data
        const scanner = await fetchScannerData();
        
        appContainer.innerHTML = `
            <h2 style="color: #FF1493; text-align: center; margin-bottom: 20px;">Results</h2>
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="text-align: left; font-size: 12px; line-height: 1.5;">
                    <div><span style="color: #8A2BE2;">Reset time-</span> ${localStorage.getItem("resetTime")}</div>
                    <div><span style="color: #FF1493;">Investment-</span> $${inv.toFixed(2)}</div>
                    <br>
                    <div><span style="color: #FF1493;">Currency-</span> ${scanner.symbol}</div>
                    <div><span style="color: #8A2BE2;">Current-</span> $${scanner.price}</div>
                    <div><span style="color: #008080;">24h Change-</span> ${scanner.change}%</div>
                </div>
                <div style="text-align: right; width: 140px;">
                    <div class="tab" id="time-reset-tab" style="background-color: #CC0000; color: white; padding: 5px; margin-bottom: 5px;">Time reset</div>
                    <div class="tab" id="money-reset-tab" style="background-color: #CC0000; color: white; padding: 5px;">$$ Reset $$</div>
                </div>
            </div>
            <h2 style="color: #FF5F1F; text-align: center; margin-top: 20px;">Accuracy</h2>
            <div class="tab sc-tab" id="new-pick-tab">New pick</div>
        `;
        document.getElementById("money-reset-tab").addEventListener("click", renderMoneyPage);
        document.getElementById("time-reset-tab").addEventListener("click", () => { localStorage.clear(); renderHomePage(); });
    }
    
    // ... (Keep your existing renderTimePage and renderMoneyPage functions here)
});
