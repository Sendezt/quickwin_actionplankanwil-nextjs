// lib\getNilaiAkhir.js
export const getNilaiAkhir = (table) => {
  const headerRow = table?.header?.[0] ?? [];
  const idx = headerRow.findIndex((h) => h.includes("Nilai Akhir"));

  if (table?.summary && idx !== -1) {
    return table.summary[idx - 2] ?? "?";
  }

  if (table?.data?.length && idx !== -1) {
    if (Array.isArray(table.data[0])) {
      return table.data[0][idx] ?? "?";
    } else if (table.data[0]?.samsat?.length) {
      return table.data[0].samsat[0][idx] ?? "?";
    }
  }
  return "?";
};