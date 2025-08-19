import React from "react";

const RenderTable4 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100 text-base font-semibold">
          <tr>
            <th rowSpan={2} className="border px-4 py-2">
              No
            </th>
            <th rowSpan={2} className="border px-4 py-2">
              Samsat Induk
            </th>
            <th
              colSpan={data.headerBottom.length}
              className="border px-4 py-2 text-center"
            >
              Jenis Banner
            </th>
            <th rowSpan={2} className="border px-4 py-2">
              Total
            </th>
          </tr>
          <tr>
            {data.headerBottom.map((h, idx) => (
              <th key={idx} className="border px-4 py-2 text-center">
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
                  className="bg-gray-200 font-semibold text-base px-4 py-2"
                >
                  {row.cabang}
                </td>
              </tr>
              {/* Baris samsat */}
              {row.samsat.map((sRow, sIdx) => (
                <tr key={sIdx}>
                  {sRow.map((col, cIdx) => (
                    <td key={cIdx} className="border px-4 py-2 text-center">
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
              {/* Ambil summary[0] = "TOTAL" untuk gabung kolom pertama */}
              <td colSpan={2} className="border px-4 py-2 text-center">
                {data.summary[0]}
              </td>

              {/* Sisanya dari summary[1..] */}
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
