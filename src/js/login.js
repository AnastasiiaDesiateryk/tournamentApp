const USERS = [
    { username: "admin", password: "matchHub", role: "admin" },
    { username: "player1", password: "player123", role: "player" }
];

// Handle login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        // Store session
        localStorage.setItem("matchhub_user", JSON.stringify(user));
        
        if (user.role === "admin") {
            window.location.href = "../../admin/admin.html";
        } else if (user.role === "player") {
            window.location.href = "../views/dashboard-user.html";
        }
    } else {
        alert("Invalid username or password");
    }
});