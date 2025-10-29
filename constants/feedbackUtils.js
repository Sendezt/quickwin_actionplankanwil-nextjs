export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const renderStatusBadge = (status, Badge) => {
  const statusConfig = {
    selesai: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      label: "Selesai",
    },
    proses: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
      label: "Proses",
    },
    default: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      label: "-",
    },
  };

  const config = statusConfig[status] || statusConfig.default;
  return (
    <Badge className={`${config.bg} ${config.text} border ${config.border}`}>
      {config.label}
    </Badge>
  );
};
    