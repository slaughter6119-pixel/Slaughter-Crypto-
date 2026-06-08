document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("app-container");
    const button = document.getElementById("ready-btn");
    
    button.addEventListener("click", () => {
        container.innerHTML = "<h1>It works!</h1>";
    });
});
