// components\admin\Feedback\StatusBadge.jsx
import React from "react";
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }) => {
  if (status === "selesai") {
    return (
      <Badge className="bg-green-100 text-green-800 border border-green-200">
        Selesai
      </Badge>
    );
  }
  if (status === "proses") {
    return (
      <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
        Proses
      </Badge>
    );
  }
  if (status === "reject") {
    return (
      <Badge className="bg-yellow-100 text-red-800 border border-reds-200">
        Reject
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
      -
    </Badge>
  );
};
