const backendUrl = "http://localhost:5000/api";

const tokenRes = localStorage.getItem("token");
if (!tokenRes) 
  window.location.href = "index.html";

const resourceForm = document.getElementById("resourceForm");
const resourcesList = document.getElementById("resourcesList");

async function loadResources() {
  const res = await fetch(`${backendUrl}/resources`, {
    headers: { Authorization: `Bearer ${tokenRes}` },
  });
  const data = await res.json();
  resourcesList.innerHTML = "";
  data.forEach((r) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <b>${r.title}</b> - ${r.description}
      <button onclick="editResource('${r._id}', '${r.title}', '${r.description}')">Edit</button>
      <button onclick="deleteResource('${r._id}')">Delete</button>
    `;
    resourcesList.appendChild(div);
  });
}
loadResources();

resourceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const alertBox = document.getElementById("alert");

  const res = await fetch(`${backendUrl}/resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenRes}`,
    },
    body: JSON.stringify({ title, description }),
  });
  const data = await res.json();
  if (res.ok) {
    alertBox.style.color = "green";
    alertBox.innerText = "Resource created!";
    resourceForm.reset();
    loadResources();
  } else {
    alertBox.style.color = "red";
    alertBox.innerText = data.error;
  }
});

window.editResource = async (id, oldTitle, oldDesc) => {
  const newTitle = prompt("Edit title", oldTitle);
  const newDesc = prompt("Edit description", oldDesc);
  if (!newTitle || !newDesc) return;

  const res = await fetch(`${backendUrl}/resources/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenRes}`,
    },
    body: JSON.stringify({ title: newTitle, description: newDesc }),
  });
  const data = await res.json();
  if (res.ok) loadResources();
  else alert(data.error);
};

window.deleteResource = async (id) => {
  if (!confirm("Delete this resource?")) return;
  const res = await fetch(`${backendUrl}/resources/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${tokenRes}` },
  });
  const data = await res.json();
  if (res.ok) loadResources();
  else alert(data.error);
};

document.querySelectorAll(".backDashboard").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
});
