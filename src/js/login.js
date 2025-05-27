// === Default Admin + 10 Players ===
const predefinedUsers = [
    { id: "1", username: "admin", password: "matchHub", role: "admin" },
    { id: "2", username: "player1", password: "123", role: "player" },
    { id: "3", username: "player2", password: "123", role: "player" },
    { id: "4", username: "player3", password: "123", role: "player" },
    { id: "5", username: "player4", password: "123", role: "player" },
    { id: "6", username: "player5", password: "123", role: "player" },
    { id: "7", username: "player6", password: "123", role: "player" },
    { id: "8", username: "player7", password: "123", role: "player" },
    { id: "9", username: "player8", password: "123", role: "player" },
    { id: "10", username: "player9", password: "123", role: "player" },
    { id: "11", username: "player10", password: "123", role: "player" }
  ];
  
  // Save predefined users only if USERS doesn't exist yet
  if (!localStorage.getItem("USERS")) {
    localStorage.setItem("USERS", JSON.stringify(predefinedUsers));
  }
  
  // === Login ===
  const loginForm = document.getElementById("loginForm");
  
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const usernameInput = document.getElementById("username").value.trim();
      const passwordInput = document.getElementById("password").value;
  
      const storedUsers = JSON.parse(localStorage.getItem("USERS")) || [];
      const user = storedUsers.find(
        (u) => u.username === usernameInput && u.password === passwordInput
      );
  
      if (user) {
        localStorage.setItem("matchhub_user", JSON.stringify(user));
        if (user.role === "admin") {
          window.location.href = "../../admin/admin.html";
        } else {
          window.location.href = "../views/dashboard-user.html";
        }
      } else {
        alert("Invalid username or password");
      }
    });
  }
  
  // === Registration (remains unchanged) ===
  const registerForm = document.getElementById("registerForm");
  
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
  
      if (!username || !email || !password) {
        alert("All fields are required.");
        return;
      }
  
      const storedUsers = JSON.parse(localStorage.getItem("USERS")) || [];
  
      const exists = storedUsers.find(
        (u) => u.email === email || u.username === username
      );
      if (exists) {
        alert("User already exists with that email or username.");
        return;
      }
  
      const newUser = {
        id: generateRandomId(),
        username,
        email,
        password,
        role: "player"
      };
  
      storedUsers.push(newUser);
      localStorage.setItem("USERS", JSON.stringify(storedUsers));
  
      alert("Account created! You can now log in.");
      registerForm.reset();
    });
  }
  
  function generateRandomId() {
    return Math.floor(Math.random() * 10000000).toString();
  }