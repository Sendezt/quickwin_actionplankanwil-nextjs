export async function fetchFeedbacks() {
  const res = await fetch("http://localhost:3000/api/feedback/read");
  return res.json();
}

export async function fetchCabangs() {
  const res = await fetch("http://localhost:3000/api/cabang/read");
  return res.json();
}

export async function fetchActionPlans() {
  const res = await fetch("http://localhost:3000/api/actionplan");
  return res.json();
}

export async function createFeedback(payload) {
  const token = localStorage.getItem("token"); // ambil token
  return fetch("http://localhost:3000/api/feedback/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ⬅️ tambahkan ini
    },
    body: JSON.stringify(payload),
  });
}

export async function updateFeedbackStatus(id, status = "selesai") {
  return fetch(`http://localhost:3000/api/feedback/${id}/selesai`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
