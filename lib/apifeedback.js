// services/feedback.js

const BASE_URL = "https://quickwin-jateng.vercel.app/api";

export async function fetchFeedbacks() {
  const res = await fetch(`${BASE_URL}/feedback/read`);
  return res.json();
}

export async function fetchCabangs() {
  const res = await fetch(`${BASE_URL}/cabang/read`);
  return res.json();
}

export async function fetchActionPlans() {
  const res = await fetch(`${BASE_URL}/actionplan`);
  return res.json();
}

export async function createFeedback(payload) {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/feedback/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function updateFeedbackStatus(
  id,
  status = "selesai",
  file = null
) {
  const url = `${BASE_URL}/feedback/${id}/selesai`;

  const formData = new FormData();
  formData.append("status", status);
  if (file) formData.append("file", file);

  return fetch(url, {
    method: "PUT",
    body: formData,
  });
}
