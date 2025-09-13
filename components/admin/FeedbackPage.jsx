"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ task: "", status: "" });

  // Fetch data
  const fetchFeedbacks = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/admin/feedback/getalldata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFeedbacks(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Update feedback
  const handleUpdate = (id) => {
    fetch(`http://localhost:3000/api/admin/feedback/updatefeedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setEditing(null);
        setForm({ task: "", status: "" });
        fetchFeedbacks();
      })
      .catch((err) => console.error("Error updating feedback:", err));
  };

  // Delete feedback
  const handleDelete = (id) => {
    if (!confirm("Yakin hapus feedback ini?")) return;
    fetch(`http://localhost:3000/api/admin/feedback/deletedata/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => fetchFeedbacks())
      .catch((err) => console.error("Error deleting feedback:", err));
  };

  // Clear all feedback
  const handleClearAll = () => {
    if (!confirm("Yakin hapus semua feedback?")) return;
    fetch("http://localhost:3000/api/admin/feedback/clearfeedback", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => fetchFeedbacks())
      .catch((err) => console.error("Error clearing feedback:", err));
  };

  // Helper format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <Card className="p-4">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manajemen Feedback</h2>
          <Button variant="destructive" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Cabang
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Action Plan
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Proses
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Selesai
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr
                    key={fb.id}
                    className="bg-white shadow rounded hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{fb.id}</td>
                    <td className="px-6 py-3">{fb.cabang?.nama}</td>
                    <td className="px-6 py-3">{fb.actionPlan?.title}</td>
                    <td className="px-6 py-3">
                      {editing === fb.id ? (
                        <Input
                          value={form.task}
                          onChange={(e) =>
                            setForm({ ...form, task: e.target.value })
                          }
                          placeholder="Edit task"
                        />
                      ) : (
                        fb.task
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {editing === fb.id ? (
                        <select
                          className="border p-2 rounded"
                          value={form.status}
                          onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                          }
                        >
                          <option value="">-- pilih status --</option>
                          <option value="proses">proses</option>
                          <option value="selesai">selesai</option>
                        </select>
                      ) : (
                        fb.status
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {formatDate(fb.timestampProses)}
                    </td>
                    <td className="px-6 py-3">
                      {formatDate(fb.timestampSelesai)}
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      {editing === fb.id ? (
                        <>
                          <Button size="sm" onClick={() => handleUpdate(fb.id)}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditing(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditing(fb.id);
                              setForm({ task: fb.task, status: fb.status });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(fb.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
