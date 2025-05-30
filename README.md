# MatchHub - Tournament Management App

**Project Duration:** 2 Weeks  
**Team Members:** 4  
**Tech Stack:** HTML, CSS, JavaScript (LocalStorage)

---

## ✨ Project Overview
MatchHub is a simple yet elegant web application that allows tournament organizers to create, manage, and monitor tournaments easily, while allowing players to view and report their match results.

This MVP focuses on two tournament formats: **Knockout** and **Round Robin**, with two separate dashboards: one for **admins** and one for **players**.

---

## 📅 Timeline Overview
| Week |      Focus      |         Goals          |
|------|-------|-------|
| 1 | Setup & Core Logic | Project structure, login UI, dashboard design, tournament algorithms |
| 2 | Integration & Polish | Connect UI to backend, implement result tracking, style polishing, testing |

---

## 👨‍💻 Team & Responsibilities

### 🔜 Frontend Team (Anastasiia and Sara)
**Responsibilities:**
- Build UI for login, admin and player dashboards
- Design with responsive layout using clean HTML/CSS
- Integrate with backend logic using JavaScript

**Deliverables:**
- `login.html`, `admin.html`, `player.html`
- `style.css` with MatchHub branding
- `main.js` for DOM interaction and UI logic

---

### 🛠️ Backend Team (Yasemin and Mustafa)
**Responsibilities:**
- Create tournament logic for Knockout & Round Robin
- Develop functions to manage users, matches, and results
- Use `localStorage` to simulate persistent storage

**Deliverables:**
- `tournament.js`: tournament algorithms
- `storage.js`: functions to save/load data
- Optionally stub API-like calls if needed

---

## 🔧 Features
- User login with role selection (admin/player)
- Create tournaments with player assignment
- View match pairings and enter/verify results
- Visual dashboards for admins and players
- Elegant layout inspired by real-world dashboard designs

---

## 📦 File Structure
```
tournament-app/
├── .vscode/
│    └── settings.json
├── admin/
│    ├── admin-css/
│    │    └── admin.css
│    ├── admin.js
│    ├── dashboard.html
│    ├── forms.css
│    ├── forms.html
│    └── forms.js
├── data/
│    ├── constants.js
│    ├── data.js
│    ├── tournaments.json
│    └── utils.js
├── public/
│    ├── index.css
│    ├── index.html
│    ├── logo.png
│    └── pexels.js
├── src/
│   ├── css/
│   │    ├── dashboard-user.css
│   │    └── login.css
│   ├── js/
│   │    ├── auth.js
│   │    ├── dashboard-user.js
│   │    ├── dashboard.js
│   │    ├── invitation.js
│   │    └── tournament.js
│   └── views/
│   │    ├── images/

│   │    ├── dashboard-user.html
│   │    └── login.html
└── README.md
```

---

## ✅ Goals
- ✅ Deliver a working MVP in 2 weeks
- ✅ Ensure clean UI and UX
- ✅ Apply structured team collaboration
