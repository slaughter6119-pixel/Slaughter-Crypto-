document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");
    
    renderHomePage();

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
            <h1 style="color: #FF1493; text-align: center; margin-bottom: 20px;">Time Page</h1>
            <div style="text-align: center; font-size: 14px; margin-bottom: 20px; line-height: 1.4;">
                This is reset time! Enter the time you want to reset currency and accuracy in 24 hour format.
            </div>
            <input type="text" id="time-input" maxlength="5" placeholder="00:00" style="width: 80px; background: black; color: #FF1493; border: 2px solid #FF1493; border-radius: 5px; padding: 10px; margin-bottom: 15px; text-align: center; font-size: 18px; letter-spacing: 2px;">
            <div class="tab" id="next-tab" style="background-color: #00FF00; color: black; border: 2px solid white; font-weight: bold;">Time</div>
        `;

        const timeInput = document.getElementById("time-input");
        timeInput.addEventListener("input", function(e) {
            let val = this.value.replace(/\D/g, ''); 
            if (val.length > 2) {
                val = val.substring(0, 2) + ':' + val.substring(2, 4);
            }
            this.value = val;
        });

        document.getElementById("next-tab").addEventListener("click", () => {
            const t = timeInput.value;
            if(t.length === 5) { 
                localStorage.setItem("resetTime", t); 
                renderMoneyPage(); 
            } else {
                alert("Please enter a full 4-digit time (e.g., 0600 or 1800).");
            }
        });
    }

    function renderMoneyPage() {
        appContainer.innerHTML = `
            <h1 style="color: #00FF00; text-align: center; margin-bottom: 20px;">Money Page</h1>
            <div style="text-align: center; font-size: 14px; margin-bottom: 20px; line-height: 1.4;">
                How much to invest?<br>Must include decimal. Such $1 is $1.00
            </div>
            <input type="number" step="0.01" id="money-input" placeholder="$ 0.00" style="width: 150px; background: black; color: #00FF00; border: 2px solid #00FF00; border-radius: 5px; padding: 10px; margin-bottom: 15px; text-align: center; font-size: 16px;">
            <div class="tab" id="track-tab" style="background-color: #00FF00; color: black; border: 2px solid white; font-weight: bold;">$ Enter</div>
        `;
        document.getElementById("track-tab").addEventListener("click", () => {
            const m = document.getElementById("money-input").value;
            if(m && m.includes(".")) { 
                localStorage.setItem("investment", m); 
                renderResultsPage(); 
            } else {
                alert("Please include a decimal point.");
            }
        });
    }

    function renderResultsPage() {
        const inv = parseFloat(localStorage.getItem("investment") || 0);
        const profitExp = (inv * 0.10).toFixed(2); 
        
        appContainer.innerHTML = `
            <h2 style="color: #FF1493; text-align: center; margin-top: 0; margin-bottom: 20px;">Results</h2>
            
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                
                <!-- Left Column Data -->
                <div style="text-align: left; font-size: 12px; line-height: 1.5; flex-grow: 1;">
                    <div><span style="color: #8A2BE2;">Reset time-</span> ${localStorage.getItem("resetTime")}</div>
                    <div><span style="color: #FF1493;">Investment entered-</span> $${inv.toFixed(2)}</div>
                    <div><span style="color: #00FF00;">Profit expected-</span> $${profitExp}</div>
                    <br>
                    <div><span style="color: #FF1493;">Currency-</span> Determining...</div>
                    <div><span style="color: #8A2BE2;">Current-</span> Determining...</div>
                    <div><span style="color: #008080;">Buy-</span> Determining...</div>
                    <div><span style="color: #00FF00;">Sell-</span> Determining...</div>
                    <br>
                    <div><span style="color: #008080;">Todays-</span> Determining...</div>
                    <div><span style="color: #8A2BE2;">Total-</span> Determining...</div>
                </div>

                <!-- Center Floating Accuracy Title -->
                <div style="display: flex; align-items: flex-end; justify-content: center; padding-bottom: 20px; font-weight: bold; font-size: 16px; color: #FF5F1F;">
                    Accuracy
                </div>
                
                <!-- Right Column Buttons -->
                <div style="text-align: right; font-size: 12px; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; width: 140px;">
                    <div><span style="color: #8A2BE2;">Time until reset-</span> 2hrs 30min</div>
                    <div class="tab" id="time-reset-tab" style="background-color: #CC0000; color: white; border: 1px solid white; font-size: 14px; padding: 5px; width: 100%; text-align: center; cursor: pointer; margin: 0;">Time reset</div>
                    <div class="tab" id="money-reset-tab" style="background-color: #CC0000; color: white; border: 1px solid white; font-size: 14px; padding: 5px; width: 100%; text-align: center; cursor: pointer; margin: 0;">$$ Reset $$</div>
                    <div class="tab" id="new-pick-tab" style="background-color: #CC0000; color: white; border: 1px solid white; font-size: 14px; padding: 5px; width: 100%; text-align: center; cursor: pointer; margin: 0;">New pick</div>
                </div>
            </div>
        `;

        document.getElementById("money-reset-tab").addEventListener("click", () => renderMoneyPage());
        
        document.getElementById("time-reset-tab").addEventListener("click", () => {
            localStorage.clear();
            renderHomePage();
        });

        document.getElementById("new-pick-tab").addEventListener("click", () => {
            alert("New pick logic coming soon!");
        });
    }
});
