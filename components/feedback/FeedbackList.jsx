"use client";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedbackList({ feedbacks, onSelesai }) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Task</th>
            <th className="p-3 text-left">Cabang</th>
            <th className="p-3 text-left">Action Plan</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Proses</th>
            <th className="p-3 text-left">Selesai</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id} className="border-t">
              <td className="p-3">{feedback.task}</td>
              <td className="p-3">{feedback.cabang?.nama}</td>
              <td className="p-3">{feedback.actionPlan?.title}</td>
              <td className="p-3">
                {feedback.status === "selesai" ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" /> Selesai
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-600">
                    <Clock className="h-4 w-4 mr-1" /> Proses
                  </span>
                )}
              </td>
              <td className="p-3">
                {feedback.timestampProses
                  ? new Date(feedback.timestampProses).toLocaleString()
                  : "-"}
              </td>
              <td className="p-3">
                {feedback.timestampSelesai
                  ? new Date(feedback.timestampSelesai).toLocaleString()
                  : "-"}
              </td>
              <td className="p-3 text-center">
                {feedback.status !== "selesai" && (
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => onSelesai(feedback)}
                  >
                    Tandai Selesai
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
