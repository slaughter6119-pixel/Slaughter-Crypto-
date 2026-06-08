document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    function renderHomePage() {
        appContainer.innerHTML = `
            <div id="welcome-text">Welcome!</div>
            <div id="main-header">Let's <span style="color: #FF5F1F;">Slaughter Crypto</span></div>
            <button id="ready-btn" style="display: block; width: 100%; padding: 20px; background: orange;">I'm ready!</button>
            <button id="not-yet-btn" style="display: block; width: 100%; padding: 20px; background: pink;">Not yet</button>
        `;

        document.getElementById("ready-btn").addEventListener("click", () => {
            alert("Ready button works!");
        });

        document.getElementById("not-yet-btn").addEventListener("click", () => {
            alert("Not yet button works!");
        });
    }

    renderHomePage();
});
