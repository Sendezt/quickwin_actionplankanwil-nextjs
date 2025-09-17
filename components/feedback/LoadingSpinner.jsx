import { Loader2 } from "lucide-react";

export function LoadingSpinner({ message = "Memuat data..." }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}