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
  let badgeClass = "bg-gray-200 text-gray-800";
  switch (value.toLowerCase()) {
    case "promitra":
      badgeClass = "bg-green-100 text-green-800";
      break;
    case "sengkuyung":
      badgeClass = "bg-blue-100 text-blue-800";
      break;
    case "sowan":
      badgeClass = "bg-yellow-100 text-yellow-800";
      break;
    case "okdealer":
      badgeClass = "bg-purple-100 text-purple-800";
      break;
    case "opsgab":
      badgeClass = "bg-red-100 text-red-800";
      break;
  }
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
    >
      {value}
    </span>
  );
};

export default function RenderTableInfo({ data }) {
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
          <div className="rounded-xl bg-gray-50 border p-4">
            {mainHeaders.map((row, i) => (
              <div key={i} className="text-center font-bold text-gray-800">
                {Array.isArray(row) ? row.filter(Boolean).join(" ") : row}
              </div>
            ))}
          </div>
        )}

        {inisiatifList.map((inisiatif, idx) => (
          <div key={idx} className="border rounded-xl p-4 shadow-sm bg-white">
            <h3 className="font-bold mb-3 text-gray-800 text-lg">
              {inisiatif.inisiatif}
            </h3>
            <div className="text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded">
              <strong>Target:</strong> {inisiatif.total?.target} |{" "}
              <strong>Nilai Akhir:</strong> {inisiatif.total?.nilaiAkhir}
            </div>

            {inisiatif.rows?.map((row, rIdx) => (
              <div
                key={`${idx}-${rIdx}`}
                className="divide-y border rounded-md mb-2"
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
                      className="px-2 py-2 text-sm flex justify-between"
                    >
                      <span className="font-medium">{header}:</span>
                      <span className="ml-2 break-words text-right">
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
          <div className="border rounded-xl p-4 bg-gray-100 text-sm font-bold">
            <div className="flex gap-4">
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
    <div className="w-full overflow-x-auto bg-white">
      <Table
        className={`w-full border border-gray-300 ${
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
                  className="text-center font-bold bg-gray-100 py-3 text-gray-900 border border-gray-300"
                >
                  {Array.isArray(row) ? row.filter(Boolean).join(" ") : row}
                </TableHead>
              </TableRow>
            ))}

          {/* Column headers */}
          <TableRow className="bg-gray-100">
            {tableHeaders.map((col, idx) => (
              <TableHead
                key={idx}
                className="text-center px-2 py-3 font-bold text-gray-800 border border-gray-300"
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
              <TableRow className="bg-gray-50">
                <TableCell
                  colSpan={4}
                  className="px-3 py-2 text-left font-bold text-gray-900 border border-gray-300"
                >
                  <div className="break-words">{inisiatif.inisiatif}</div>
                </TableCell>
                <TableCell className="text-center px-2 py-2 font-bold text-gray-900 border border-gray-300">
                  {inisiatif.total?.target || ""}
                </TableCell>
                <TableCell className="text-center px-2 py-2 font-bold text-gray-900 border border-gray-300">
                  {inisiatif.total?.nilaiAkhir || ""}
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="px-2 py-2 border border-gray-300"
                ></TableCell>
              </TableRow>

              {/* Detail rows */}
              {inisiatif.rows?.map((row, rIdx) => (
                <TableRow key={`${idx}-${rIdx}`} className="hover:bg-gray-50">
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
                        className={`px-2 py-2 border border-gray-300 ${textAlign} align-top`}
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
            <TableRow className="bg-gray-200 font-bold">
              <TableCell className="px-2 py-2 border border-gray-300"></TableCell>
              <TableCell className="px-2 py-2 border border-gray-300"></TableCell>
              <TableCell className="px-2 py-2 border border-gray-300"></TableCell>
              <TableCell className="px-2 py-2 text-center font-bold border border-gray-300">
                {summary[0] || "Total"}
              </TableCell>
              <TableCell className="px-2 py-2 text-center font-bold border border-gray-300">
                {summary[1] || ""}
              </TableCell>
              <TableCell className="px-2 py-2 text-center font-bold border border-gray-300">
                {summary[2] || ""}
              </TableCell>
              <TableCell
                className="px-2 py-2 border border-gray-300"
                colSpan={2}
              ></TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
