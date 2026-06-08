document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app-container");

    function renderHomePage() {
        appContainer.innerHTML = `
            <h1 style="color: #FF5F1F;">Let's Slaughter Crypto</h1>
            <button id="ready-btn" style="background: #FF5F1F; color: white;">I'm ready!</button>
        `;
        document.getElementById("ready-btn").onclick = () => {
            appContainer.innerHTML = '<h1 style="color:white;">Test Successful</h1>';
        };
    }
    renderHomePage();
});
