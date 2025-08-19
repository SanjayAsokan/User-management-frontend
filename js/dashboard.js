const backendUrl = "https://user-management-backend-bk3n.onrender.com";

const token = localStorage.getItem("token");
if (!token) window.location.href = "index.html";

// Helper to decode JWT
function parseJwt(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

const userData = parseJwt(token);
document.getElementById("welcome").innerText = `Welcome, ${userData.role}`;

// Show role-based sections
if (userData.role === "admin") document.getElementById("adminSection").style.display = "block";
if (userData.role === "moderator") document.getElementById("moderatorSection").style.display = "block";
if (userData.role === "user") document.getElementById("userSection").style.display = "block";

// Logout button
document.getElementById("logout")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

// Admin: View all users
document.getElementById("viewUsers")?.addEventListener("click", async () => {
  try {
    const res = await fetch(`${backendUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const users = await res.json();
    const list = document.getElementById("usersList");
    list.innerHTML = "";
    users.forEach((u) => {
      const div = document.createElement("div");
      div.innerText = `${u.name} - ${u.email} - ${u.role}`;
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load users:", err);
  }
});

// PROFILE PAGE
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  async function loadProfile() {
    try {
      const res = await fetch(`${backendUrl}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.email;
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  }
  loadProfile();

  profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const alertBox = document.getElementById("alert");

    try {
      const res = await fetch(`${backendUrl}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alertBox.style.color = "green";
        alertBox.innerText = "Profile updated!";
      } else {
        alertBox.style.color = "red";
        alertBox.innerText = data.error;
      }
    } catch (err) {
      alertBox.style.color = "red";
      alertBox.innerText = "Something went wrong!";
      console.error(err);
    }
  });
}

// Back to Dashboard buttons
document.querySelectorAll(".backDashboard").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
});
