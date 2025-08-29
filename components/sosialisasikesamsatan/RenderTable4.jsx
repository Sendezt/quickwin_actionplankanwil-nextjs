import React from "react";

const RenderTable4 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            {/* No */}
            <th rowSpan={2} className="border px-4 py-2 whitespace-nowrap">
              {data.headerTop[0]}
            </th>
            {/* Samsat Induk */}
            <th rowSpan={2} className="border px-4 py-2 whitespace-nowrap">
              {data.headerTop[1]}
            </th>
            {/* Jenis Banner (colspan) */}
            <th
              colSpan={data.headerBottom.length}
              className="border px-4 py-2 text-center whitespace-nowrap"
            >
              {data.headerTop[2]}
            </th>
            {/* Total */}
            <th rowSpan={2} className="border px-4 py-2 whitespace-nowrap">
              {data.headerTop[3]}
            </th>
          </tr>
          <tr>
            {data.headerBottom.map((h, idx) => (
              <th
                key={idx}
                className="border px-4 py-2 text-center whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.data.map((row, idx) => (
            <React.Fragment key={idx}>
              {/* Baris cabang */}
              <tr>
                <td
                  colSpan={data.headerBottom.length + 3}
                  className="bg-gray-200 font-semibold text-base px-4 py-2 text-left"
                >
                  {row.cabang}
                </td>
              </tr>
              {/* Baris samsat */}
              {row.samsat.map((sRow, sIdx) => (
                <tr key={sIdx}>
                  {sRow.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={cIdx === 1 ? "border px-4 py-2 text-left whitespace-nowrap" : "border px-4 py-2 text-center whitespace-nowrap"}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* Summary */}
          {data.summary && (
            <tr className="bg-gray-100 font-bold text-sm">
              {/* Kolom pertama gabung No + Samsat Induk */}
              <td colSpan={2} className="border px-4 py-2 text-center">
                {data.summary[0]}
              </td>
              {data.summary.slice(1).map((val, idx) => (
                <td key={idx} className="border px-4 py-2 text-center">
                  {val}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RenderTable4;
