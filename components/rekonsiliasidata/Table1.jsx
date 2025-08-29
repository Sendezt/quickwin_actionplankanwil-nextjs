"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const normalizeTableData = (data) => {
  if (!Array.isArray(data)) return [];

  const normalizedRows = [];

  data.forEach((cabangItem) => {
    if (cabangItem.cabang) {
      normalizedRows.push([cabangItem.cabang, "", "", "", "", "", "", ""]);
    }

    if (Array.isArray(cabangItem.samsat)) {
      cabangItem.samsat.forEach((samsatRow) => {
        normalizedRows.push(samsatRow);
      });
    }
  });

  return normalizedRows;
};

const normalizeSummary = (summary) => {
  if (!Array.isArray(summary)) return [];
  return summary;
};

export default function TableCardWrapper({
  title,
  description,
  headers,
  data,
  summary,
  isNested = false,
}) {
  const tableData = isNested ? normalizeTableData(data) : data;
  const tableSummary = isNested ? normalizeSummary(summary) : summary;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                {Array.isArray(headers) &&
                  headers.map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-900 whitespace-pre-line"
                    >
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) &&
                tableData.map((row, rowIndex) => {
                  const isCabangHeader =
                    isNested && row[1] === "" && row[0] !== "";

                  return (
                    <tr
                      key={rowIndex}
                      className={
                        isCabangHeader
                          ? "bg-gray-100 font-semibold"
                          : "hover:bg-gray-50"
                      }
                    >
                      {isCabangHeader ? (
                        <td
                          className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-semibold"
                          colSpan={headers.length}
                        >
                          {row[0]}
                        </td>
                      ) : (
                        Array.isArray(row) &&
                        row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={
                              cellIndex === 1
                                ? "border border-gray-300 px-4 py-2 text-sm text-gray-700 text-left"
                                : "border border-gray-300 px-4 py-2 text-sm text-gray-700 text-center"
                            }
                          >
                            {cell}
                          </td>
                        ))
                      )}
                    </tr>
                  );
                })}
              {Array.isArray(tableSummary) && tableSummary.length > 0 && (
                <tr className="bg-blue-50 font-semibold text-center">
                  {/* Merge 2 cell terdepan */}
                  <td
                    colSpan={2}
                    className="border border-gray-300 px-4 py-2 text-sm text-gray-900 text-center"
                  >
                    {tableSummary[0]}
                  </td>

                  {/* Sisanya normal */}
                  {tableSummary.slice(1).map((summaryCell, summaryIndex) => (
                    <td
                      key={summaryIndex}
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-900"
                    >
                      {summaryCell}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
