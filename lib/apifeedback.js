export async function fetchFeedbacks() {
  const res = await fetch("https://magangproject.vercel.app/api/feedback/read");
  return res.json();
}

export async function fetchCabangs() {
  const res = await fetch("https://magangproject.vercel.app/api/cabang/read");
  return res.json();
}

export async function fetchActionPlans() {
  const res = await fetch("https://magangproject.vercel.app/api/actionplan");
  return res.json();
}

export async function createFeedback(payload) {
  return fetch("https://magangproject.vercel.app/api/feedback/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateFeedbackStatus(id, status = "selesai") {
  return fetch(`https://magangproject.vercel.app/api/feedback/${id}/selesai`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
