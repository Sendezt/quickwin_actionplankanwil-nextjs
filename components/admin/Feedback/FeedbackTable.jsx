// components\admin\Feedback\FeedbackTable.jsx
import React from 'react';
import { FeedbackTableRow } from './FeedbackTableRow';

export const FeedbackTable = ({ feedbacks, onEdit, onDelete, onReview }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">No</th>
            <th className="px-6 py-3 text-left">Cabang</th>
            <th className="px-6 py-3 text-left">Action Plan</th>
            <th className="px-6 py-3 text-left">Feedback</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <FeedbackTableRow
              key={fb.id}
              feedback={fb}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              onReview={onReview}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};