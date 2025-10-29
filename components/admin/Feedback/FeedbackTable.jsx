import React from "react";
import { FeedbackTableHeader } from "./FeedbackTableHeader";
import { FeedbackTableRow } from "./FeedbackTableRow";

export const FeedbackTable = ({ feedbacks, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-2 text-sm">
      <FeedbackTableHeader />
      <tbody>
        {feedbacks.map((fb, index) => (
          <FeedbackTableRow
            key={fb.id}
            feedback={fb}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);
