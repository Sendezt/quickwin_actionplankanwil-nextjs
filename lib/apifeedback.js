export async function fetchFeedbacks() {
  const res = await fetch(
    "https://quickwin-jateng.vercel.app/api/feedback/read"
  );
  return res.json();
}

export async function fetchCabangs() {
  const res = await fetch("https://quickwin-jateng.vercel.app/api/cabang/read");
  return res.json();
}

export async function fetchActionPlans() {
  const res = await fetch("https://quickwin-jateng.vercel.app/api/actionplan");
  return res.json();
}

export async function createFeedback(payload) {
  const token = localStorage.getItem("token"); // ambil token
  return fetch("https://quickwin-jateng.vercel.app/api/feedback/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ⬅️ tambahkan ini
    },
    body: JSON.stringify(payload),
  });
}

export async function updateFeedbackStatus(id, status = "selesai") {
  return fetch(
    `https://quickwin-jateng.vercel.app/api/feedback/${id}/selesai`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
}
