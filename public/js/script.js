// Simple interactivity for home page
document.addEventListener("DOMContentLoaded", () => {
    const exploreBtn = document.getElementById("explore-btn");

    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            alert("Redirecting to job listings...");
            window.location.href = "/jobs";
        });
    }

    // Example: dynamic greeting
    const hour = new Date().getHours();
    let greet = "Welcome";
    if (hour < 12) greet = "Good Morning!";
    else if (hour < 18) greet = "Good Afternoon!";
    else greet = "Good Evening!";

    console.log(greet);
});
