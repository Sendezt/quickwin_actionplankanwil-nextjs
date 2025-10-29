import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingOverlay = ({ message = "Memuat data..." }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  </div>
);
