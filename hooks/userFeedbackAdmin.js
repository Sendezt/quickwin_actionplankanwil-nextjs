import { useCallback } from "react";

export const useFeedbackAPI = (BASE_URL) => {
  const getAuthHeaders = useCallback((includeContentType = true) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    if (includeContentType) headers["Content-Type"] = "application/json";
    return headers;
  }, []);

  const fetchFeedbacks = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/admin/feedback/getalldata`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    return data.success ? data.data : [];
  }, [BASE_URL, getAuthHeaders]);

  const fetchActionPlans = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/actionplan`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }, [BASE_URL]);

  const fetchCabangs = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/cabang/read`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }, [BASE_URL]);

  const createFeedback = useCallback(
    async (formData) => {
      const res = await fetch(`${BASE_URL}/api/admin/feedback/createfeedback`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          cabangId: formData.cabangId,
          actionPlanId: formData.actionPlanId,
          subActionPlanId: formData.subActionPlanId,
          task: formData.task,
        }),
      });
      return await res.json();
    },
    [BASE_URL, getAuthHeaders]
  );

  const updateFeedback = useCallback(
    async (id, data) => {
      const res = await fetch(
        `${BASE_URL}/api/admin/feedback/updatefeedback/${id}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(data),
        }
      );
      return await res.json();
    },
    [BASE_URL, getAuthHeaders]
  );

  const uploadFeedbackFile = useCallback(
    async (id, file) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(
        `${BASE_URL}/api/admin/feedback/uploadfeedback/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: fd,
        }
      );
      return await res.json();
    },
    [BASE_URL]
  );

  const deleteFeedback = useCallback(
    async (id) => {
      await fetch(`${BASE_URL}/api/admin/feedback/deletedata/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    },
    [BASE_URL]
  );

  const clearAllFeedback = useCallback(async () => {
    await fetch(`${BASE_URL}/api/admin/feedback/clearfeedback`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }, [BASE_URL]);

  return {
    fetchFeedbacks,
    fetchActionPlans,
    fetchCabangs,
    createFeedback,
    updateFeedback,
    uploadFeedbackFile,
    deleteFeedback,
    clearAllFeedback,
  };
};
