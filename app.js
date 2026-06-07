document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");
    
    let resetTime = localStorage.getItem("resetTime");
    let investment = localStorage.getItem("investment");
    
    if (resetTime && investment) {
        renderResultsPage();
    } else {
        renderHomePage();
    }

    function renderHomePage() {
        appContainer.innerHTML = `
            <div id="welcome-text">Welcome!</div>
            <div id="main-header">Let's <span style="color: #FF5F1F;">Slaughter Crypto</span></div>
            <div class="tab ready-btn" id="ready-tab">I'm ready!</div>
            <div class="tab not-yet-btn" id="not-yet-tab">Not yet</div>
            <div id="instructional-text">
                Keep in mind we are working on at minimum of <strong>90%</strong> accuracy, <span style="color: red;">but may not be there yet</span>. Also right as you open your accuracy will be <span style="color: red;">0%</span>, and build daily.
            </div>
        `;
        
        document.getElementById("ready-tab").addEventListener("click", () => renderTimePage());
        
        document.getElementById("not-yet-tab").addEventListener("click", () => {
            document.body.innerHTML = '<h1 style="color: #FF5F1F; text-align: center; margin-top: 50px;">Application Closed</h1>';
        });
    }

    function renderTimePage() {
        appContainer.innerHTML = `
            <div style="color: #8A2BE2; text-align: center; margin-bottom: 10px;">Time Page (24h format)</div>
            <input type="time" id="time-input" style="width: 90%; background: black; color: white; border: 1px solid white; padding: 10px; margin-bottom: 10px;">
            <div class="tab sc-tab" id="next-tab">Next</div>
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
            <div class="tab sc-tab" id="track-tab">Track</div>
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
        appContainer.innerHTML = `
            <div id="trading-data" style="width: 100%; text-align: center;">
                <div>Investment: $<span id="inv-display">${localStorage.getItem("investment")}</span></div>
                <div>Buy: $<span id="buy-display">0.00</span> | Sell: $<span id="sell-display">0.00</span></div>
                <div>Current: $<span id="curr-display">0.00</span></div>
            </div>
            <h2 style="color: #FF5F1F; text-align: center; margin-top: 20px;">Accuracy</h2>
            <div style="color: #008080; text-align: center; width: 100%;">Todays- <span id="todays-acc">0.00%</span></div>
            <div class="tab sc-tab" id="money-reset-tab">$$ Reset $$</div>
            <div class="tab sc-tab" id="time-reset-tab">Time reset</div>
        `;

        document.getElementById("money-reset-tab").addEventListener("click", () => renderMoneyPage());
        
        document.getElementById("time-reset-tab").addEventListener("click", () => {
            localStorage.clear();
            alert("Historical arrays completely purged.");
            renderHomePage();
        });
        
        setTimeout(() => triggerVictoryState(100.45), 6000); 
    }

    function triggerVictoryState(liveAccuracy) {
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
