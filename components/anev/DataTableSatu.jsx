import React from "react";

const DataTableSatu = ({ header, data, result, loading }) => {
  if (loading) {
    return <p>Sedang memuat data...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm text-center">
        <thead className="bg-gray-100">
          {header.map((row, ridx) => (
            <tr key={ridx}>
              {row.map((cell, cidx) => (
                <th
                  key={cidx}
                  className="border border-gray-300 px-3 py-2 font-semibold"
                >
                  {cell}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {row.map((cell, cidx) => (
                  <td key={cidx} className="border border-gray-300 px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={header[0]?.length || 1}
                className="text-center border border-gray-300 py-3 text-gray-500"
              >
                Tidak ada data.
              </td>
            </tr>
          )}

          {/* Baris Total */}
          {result && result.length > 0 && (
            <tr className="bg-gray-200 font-semibold">
              {result.map((cell, idx) => (
                <td
                  key={idx}
                  className="border border-gray-400 px-3 py-2 text-[0.95rem]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableSatu;
