// hooks\admin\useFeedbackApi.js
import { useState, useCallback } from "react";

export const useFeedbackApi = (baseUrl) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [clearing, setClearing] = useState(false);

  const getAuthHeaders = (includeContentType = true) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    if (includeContentType) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  };

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/admin/feedback/getalldata`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  const createFeedback = useCallback(
    async (formData) => {
      try {
        const res = await fetch(
          `${baseUrl}/api/admin/feedback/createfeedback`,
          {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              cabangId: formData.cabangId,
              actionPlanId: formData.actionPlanId,
              subActionPlanId: formData.subActionPlanId,
              task: formData.task,
            }),
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error create feedback:", err);
        return { success: false };
      }
    },
    [baseUrl]
  );

  const updateFeedback = useCallback(
    async (id, updateData) => {
      setSaving(true);
      try {
        const res = await fetch(
          `${baseUrl}/api/admin/feedback/updatefeedback/${id}`,
          {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updateData),
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error updating feedback:", err);
        return { success: false };
      } finally {
        setSaving(false);
      }
    },
    [baseUrl]
  );

  const uploadFeedbackFile = useCallback(
    async (id, file) => {
      setSaving(true);
      try {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch(
          `${baseUrl}/api/admin/feedback/uploadfeedback/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: fd,
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error uploading file:", err);
        return { success: false };
      } finally {
        setSaving(false);
      }
    },
    [baseUrl]
  );

  const deleteFeedback = useCallback(
    async (id) => {
      setDeleting(true);
      try {
        const res = await fetch(
          `${baseUrl}/api/admin/feedback/deletedata/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return res.ok;
      } catch (err) {
        console.error("Error deleting feedback:", err);
        return false;
      } finally {
        setDeleting(false);
      }
    },
    [baseUrl]
  );

  const clearAllFeedback = useCallback(async () => {
    setClearing(true);
    try {
      const res = await fetch(`${baseUrl}/api/admin/feedback/clearfeedback`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.ok;
    } catch (err) {
      console.error("Error clearing feedback:", err);
      return false;
    } finally {
      setClearing(false);
    }
  }, [baseUrl]);

  return {
    loading,
    saving,
    deleting,
    clearing,
    fetchFeedbacks,
    createFeedback,
    updateFeedback,
    uploadFeedbackFile,
    deleteFeedback,
    clearAllFeedback,
  };
};
