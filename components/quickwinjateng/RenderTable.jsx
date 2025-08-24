import React, { useState, useEffect } from "react";

// Simple table components (tetap seperti punyamu)
const Table = ({ children, className }) => (
  <table className={`border-collapse ${className}`}>{children}</table>
);
const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableHead = ({ children, className, colSpan }) => (
  <th className={className} colSpan={colSpan}>
    {children}
  </th>
);
const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableCell = ({ children, className, colSpan }) => (
  <td className={className} colSpan={colSpan}>
    {children}
  </td>
);
const TableFooter = ({ children }) => <tfoot>{children}</tfoot>;

// 🎨 helper untuk badge Quickwins
const getQuickwinsBadge = (value) => {
  if (!value) return null;
  let badgeClass = "bg-gray-400 text-white border border-gray-500";
  switch (value.toLowerCase()) {
    case "promitra":
      badgeClass = "bg-emerald-500 text-white border border-emerald-600";
      break;
    case "sengkuyung":
      badgeClass = "bg-sky-500 text-white border border-sky-600";
      break;
    case "sowan":
      badgeClass = "bg-amber-500 text-white border border-amber-600";
      break;
    case "okdealer":
      badgeClass = "bg-violet-500 text-white border border-violet-600";
      break;
    case "opsgab":
      badgeClass = "bg-rose-500 text-white border border-rose-600";
      break;
  }
  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-bold ${badgeClass} shadow-md`}
    >
      {value}
    </span>
  );
};

export default function RenderTableQuickwins({ data }) {
  const [viewMode, setViewMode] = useState("table"); // table | compact | cards

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) setViewMode("cards");
      else if (window.innerWidth < 1024) setViewMode("compact");
      else setViewMode("table");
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!data) return null;

  // === Ambil struktur API terbaru ===
  const mainHeaders = data.header?.main || [];
  const tableHeaders = data.header?.table || [
    "No",
    "Judul",
    "PIC",
    "Status",
    "Target",
    "Nilai Akhir",
    "Action Plan",
    "Quickwins",
  ];
  const inisiatifList = Array.isArray(data.data) ? data.data : [];
  const summary = Array.isArray(data.summary) ? data.summary : null;

  // kolom table = 8 (ActionPlanID di row[6] tidak ditampilkan)
  // mapping headerIndex -> rowIndex
  const headerIdxToRowIdx = (hIdx) => (hIdx <= 5 ? hIdx : hIdx + 1);

  // Fixed column widths untuk 8 kolom
  const colWidths = [
    "5%", // No
    "30%", // Judul
    "12%", // PIC
    "10%", // Status
    "8%", // Target
    "10%", // Nilai Akhir
    "15%", // Action Plan (row[7])
    "10%", // Quickwins (row[8])
  ];

  // === CARD MODE (mobile) ===
  if (viewMode === "cards") {
    return (
      <div className="space-y-4 p-4">
        {/* Header Utama */}
        {mainHeaders.length > 0 && (
          <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 border border-cyan-600 p-4 shadow-lg">
            {mainHeaders.map((row, i) => (
              <div
                key={i}
                className="text-center font-bold text-white text-lg drop-shadow-md"
              >
                {Array.isArray(row) ? row.filter(Boolean).join(" ") : row}
              </div>
            ))}
          </div>
        )}

        {inisiatifList.map((inisiatif, idx) => (
          <div
            key={idx}
            className="border border-gray-400 rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="font-black mb-3 text-gray-900 text-lg border-b border-gray-300 pb-2">
              {inisiatif.inisiatif}
            </h3>
            <div className="text-sm text-white mb-4 p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded border border-emerald-600 font-semibold shadow-md">
              <strong>Target:</strong> {inisiatif.total?.target} |{" "}
              <strong>Nilai Akhir:</strong> {inisiatif.total?.nilaiAkhir}
            </div>

            {inisiatif.rows?.map((row, rIdx) => (
              <div
                key={`${idx}-${rIdx}`}
                className="border border-gray-300 rounded-md mb-3 shadow-sm bg-gray-50"
              >
                {tableHeaders.map((header, hIdx) => {
                  let cellValue = "";

                  if (hIdx === 6) {
                    cellValue = `${row[6] ? row[6] + ". " : ""}${row[7] || ""}`;
                  } else {
                    const rIndex = headerIdxToRowIdx(hIdx);
                    cellValue = Array.isArray(row) ? row[rIndex] : "";
                  }

                  return (
                    <div
                      key={hIdx}
                      className="px-3 py-2 text-sm flex justify-between border-b border-gray-200 last:border-b-0"
                    >
                      <span className="font-bold text-gray-800">{header}:</span>
                      <span className="ml-2 break-words text-right font-semibold text-gray-900">
                        {hIdx === 7
                          ? getQuickwinsBadge(cellValue)
                          : cellValue || ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}

        {/* Summary */}
        {summary && (
          <div className="border border-indigo-400 rounded-lg p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-bold text-white shadow-lg">
            <div className="flex gap-4 drop-shadow-md">
              <div className="shrink-0">{summary[0] || "Total"}</div>
              <div>Target: {summary[1] || ""}</div>
              <div>Nilai Akhir: {summary[2] || ""}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // === TABLE / COMPACT MODE ===
  return (
    <div className="w-full overflow-x-auto bg-white border border-cyan-400 rounded-lg shadow-xl">
      <Table
        className={`w-full border-collapse ${
          viewMode === "compact" ? "text-xs" : "text-sm"
        }`}
        style={{ tableLayout: "fixed" }}
      >
        <colgroup>
          {colWidths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>

        <TableHeader>
          {/* Main headers (judul besar) */}
          {mainHeaders.length > 0 &&
            mainHeaders.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                <TableHead
                  colSpan={tableHeaders.length}
                  className="text-center font-black bg-gradient-to-r from-cyan-500 to-blue-500 py-4 text-white border border-cyan-600 text-base drop-shadow-md"
                >
                  {Array.isArray(row) ? row.filter(Boolean).join(" ") : row}
                </TableHead>
              </TableRow>
            ))}

          {/* Column headers */}
          <TableRow className="bg-gradient-to-r from-slate-600 to-slate-700">
            {tableHeaders.map((col, idx) => (
              <TableHead
                key={idx}
                className="text-center px-3 py-3 font-black text-white border border-slate-500 drop-shadow-md"
              >
                <div className="break-words">{col}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {inisiatifList.map((inisiatif, idx) => (
            <React.Fragment key={idx}>
              {/* Baris judul inisiatif + total */}
              <TableRow className="bg-gradient-to-r from-emerald-100 to-teal-100 border-t border-emerald-400">
                <TableCell
                  colSpan={4}
                  className="px-3 py-3 text-left font-black text-emerald-900 border border-emerald-400"
                >
                  <div className="break-words">{inisiatif.inisiatif}</div>
                </TableCell>
                <TableCell className="text-center px-2 py-3 font-black text-emerald-900 border border-emerald-400">
                  {inisiatif.total?.target || ""}
                </TableCell>
                <TableCell className="text-center px-2 py-3 font-black text-emerald-900 border border-emerald-400">
                  {inisiatif.total?.nilaiAkhir || ""}
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="px-2 py-3 border border-emerald-400"
                ></TableCell>
              </TableRow>

              {/* Detail rows */}
              {inisiatif.rows?.map((row, rIdx) => (
                <TableRow
                  key={`${idx}-${rIdx}`}
                  className="hover:bg-cyan-50 even:bg-slate-50 transition-colors duration-200"
                >
                  {tableHeaders.map((_, hIdx) => {
                    let cellValue = "";

                    if (hIdx === 6) {
                      // Gabungkan row[6] dan row[7] untuk kolom Action Plan
                      cellValue = `${row[6] ? row[6] + ". " : ""}${
                        row[7] || ""
                      }`;
                    } else {
                      const rIndex = headerIdxToRowIdx(hIdx);
                      cellValue = Array.isArray(row) ? row[rIndex] : "";
                    }

                    const textAlign =
                      hIdx === 0 || hIdx === 4 || hIdx === 5
                        ? "text-center"
                        : "text-left";

                    return (
                      <TableCell
                        key={hIdx}
                        className={`px-3 py-3 border border-slate-300 ${textAlign} align-top font-medium text-slate-800`}
                      >
                        <div className="break-words whitespace-normal">
                          {hIdx === 7
                            ? getQuickwinsBadge(cellValue)
                            : cellValue || ""}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>

        {/* Summary footer (root) */}
        {summary && (
          <TableFooter>
            <TableRow className="bg-gradient-to-r from-cyan-500 to-blue-500 font-black text-white border-t-2 border-cyan-500">
              <TableCell className="px-3 py-3 border border-cyan-500"></TableCell>
              <TableCell className="px-3 py-3 border border-cyan-500"></TableCell>
              <TableCell className="px-3 py-3 border border-cyan-500"></TableCell>
              <TableCell className="px-3 py-3 text-center font-black border border-indigo-500 drop-shadow-md">
                {summary[0] || "Total"}
              </TableCell>
              <TableCell className="px-3 py-3 text-center font-black border border-indigo-500 drop-shadow-md">
                {summary[1] || ""}
              </TableCell>
              <TableCell className="px-3 py-3 text-center font-black border border-indigo-500 drop-shadow-md">
                {summary[2] || ""}
              </TableCell>
              <TableCell
                className="px-3 py-3 border border-indigo-500"
                colSpan={2}
              ></TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
