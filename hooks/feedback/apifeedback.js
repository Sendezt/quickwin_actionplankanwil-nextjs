// services/feedback.js

const BASE_URL = "https://magangproject.vercel.app/api";

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

export async function fetchSubActionPlans() {
  const res = await fetch(`${BASE_URL}/admin/sub/getsub`);
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

/**
 * Update feedback status menjadi "selesai" dengan upload file bukti
 * Backend menggunakan Busboy yang hanya membaca file stream
 * @param {number} id - ID feedback
 * @param {File} file - File bukti (gambar atau PDF)
 */
export async function updateFeedbackStatus(id, file) {
  const url = `${BASE_URL}/feedback/${id}/selesai`;
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Jangan tambahkan Content-Type, biar browser set otomatis
    },
    body: formData,
  });
}

/**
 * Ganti file bukti feedback yang sudah selesai
 * @param {number} id - ID feedback
 * @param {File} file - File bukti baru (gambar atau PDF)
 */
export async function replaceFeedbackFile(id, file) {
  const url = `${BASE_URL}/feedback/${id}/file`;
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}
