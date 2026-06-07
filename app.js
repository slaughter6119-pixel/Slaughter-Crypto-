document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");
    
    let resetTime = localStorage.getItem("resetTime");
    let investment = localStorage.getItem("investment");
    
    // Smart Navigation: Bypasses setup if data exists
    if (resetTime && investment) {
        renderResultsPage();
    } else {
        renderHomePage();
    }

    function renderHomePage() {
        appContainer.innerHTML = `
            <div class="sc-icon">SC</div>
            <div class="tab" id="ready-tab">I'm ready</div>
            <div class="tab" id="not-yet-tab">Not yet</div>
        `;
        
        document.getElementById("ready-tab").addEventListener("click", () => renderTimePage());
        
        // Terminates the application state completely
        document.getElementById("not-yet-tab").addEventListener("click", () => {
            document.body.innerHTML = '<h1 style="color: #FF5F1F; text-align: center; margin-top: 50px;">Application Closed</h1>';
        });
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <div style="color: #8A2BE2; text-align: center; margin-bottom: 10px;">Time Page (24h format)</div>
            <input type="time" id="time-input" style="width: 90%; background: black; color: white; border: 1px solid white; padding: 10px; margin-bottom: 10px;">
            <div class="tab" id="next-tab">Next</div>
        `;
        document.getElementById("next-tab").addEventListener("click", () => {
            const t = document.getElementById("time-input").value;
            if(t) { 
                localStorage.setItem("resetTime", t); 
                renderMoneyPage(); 
            }
        });
    }

    function renderMoneyPage() {
        appContainer.innerHTML = `
            <div style="color: #8A2BE2; text-align: center; margin-bottom: 10px;">Money Page (Decimals required)</div>
            <input type="number" step="0.01" id="money-input" style="width: 90%; background: black; color: white; border: 1px solid white; padding: 10px; margin-bottom: 10px;">
            <div class="tab" id="track-tab">Track</div>
        `;
        document.getElementById("track-tab").addEventListener("click", () => {
            const m = document.getElementById("money-input").value;
            if(m && m.includes(".")) { 
                localStorage.setItem("investment", m); 
                renderResultsPage(); 
            }
        });
    }

    function renderResultsPage() {
        // Active Trading Clutter Display
        appContainer.innerHTML = `
            <div id="trading-data" style="width: 100%; text-align: center;">
                <div>Investment: $<span id="inv-display">${localStorage.getItem("investment")}</span></div>
                <div>Buy: $<span id="buy-display">0.00</span> | Sell: $<span id="sell-display">0.00</span></div>
                <div>Current: $<span id="curr-display">0.00</span></div>
            </div>
            <h2 style="color: #FF5F1F; text-align: center; margin-top: 20px;">Accuracy</h2>
            <div style="color: #008080; text-align: center; width: 100%;">Todays- <span id="todays-acc">0.00%</span></div>
            <div class="tab" id="money-reset-tab">$$ Reset $$</div>
            <div class="tab" id="time-reset-tab">Time reset</div>
        `;

        document.getElementById("money-reset-tab").addEventListener("click", () => renderMoneyPage());
        
        document.getElementById("time-reset-tab").addEventListener("click", () => {
            localStorage.clear();
            alert("Historical arrays completely purged.");
            renderHomePage();
        });
        
        // Engine constantly checks live accuracy. Once it hits exactly 100%, it triggers the victory wipe.
        // (Placeholder execution for the UI test)
        setTimeout(() => triggerVictoryState(100.45), 6000); 
    }

    function triggerVictoryState(liveAccuracy) {
        // UI Wipe: Clears clutter and locks in the daily goal reached display
        appContainer.innerHTML = `
            <div style="width: 100%; text-align: center; margin-top: 20px;">
                <div>Reset time- ${localStorage.getItem("resetTime")}</div>
                <div>Currency- Bitcoin</div>
                <div style="color: #008080; font-weight: bold;">Todays- ${liveAccuracy.toFixed(2)}%</div>
                <div>Total- 100.00%</div>
            </div>
        `;
    }
});

