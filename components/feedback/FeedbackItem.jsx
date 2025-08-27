import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function FeedbackItem({ feedback, onSelesai }) {
  const getIcon = (status) =>
    status === "selesai" ? <CheckCircle className="text-green-500" /> :
    status === "proses" ? <Clock className="text-yellow-500" /> :
    <AlertCircle className="text-gray-500" />;

  return (
    <div className="p-6 flex justify-between items-center hover:bg-gray-50">
      <div className="flex items-center gap-3">
        {getIcon(feedback.status)}
        <div>
          <h3 className="font-medium">{feedback.task}</h3>
          <p className="text-sm text-gray-500">
            Cabang: {feedback.cabangId} | Action Plan: {feedback.actionPlanId}
          </p>
        </div>
      </div>
      {feedback.status === "proses" && (
        <button onClick={() => onSelesai(feedback)} className="text-green-600 hover:underline">
          Tandai Selesai
        </button>
      )}
    </div>
  );
}
