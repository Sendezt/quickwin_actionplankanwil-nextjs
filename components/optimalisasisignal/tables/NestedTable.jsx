// components\optimalisasisignal\tables\NestedTable.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const NestedTable = ({ data, isTable5 }) => {
  if (!data) return <Skeleton className="h-[200px] w-full" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {(Array.isArray(data?.header?.[0])
              ? data.header[0]
              : data?.header || []
            ).map((header, idx) => (
              <th
                key={idx}
                className={`border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 ${
                  idx === 1 ? "text-left" : "text-center"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.data) &&
            data.data.map((row, idx) => {
              if (row?.cabang && Array.isArray(row?.samsat)) {
                return (
                  <React.Fragment key={idx}>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={data.header?.[0]?.length || 7}
                        className="border border-gray-300 px-4 py-2 text-sm font-bold text-center"
                      >
                        {row.cabang}
                      </td>
                    </tr>
                    {row.samsat.map((samsatRow, samsatIdx) => {
                      if (Array.isArray(samsatRow) && samsatRow.length === 1) {
                        return (
                          <tr key={samsatIdx} className="bg-green-100">
                            <td
                              colSpan={data.header?.[0]?.length || 7}
                              className="border border-gray-300 px-4 py-2 text-sm font-semibold text-green-800 text-center"
                            >
                              {samsatRow[0]}
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={samsatIdx} className="hover:bg-gray-50">
                          {samsatRow.map((cell, cIdx) => {
                            if (
                              isTable5 &&
                              (cell === 0 || cell === "0") &&
                              cIdx >= samsatRow.length - 2
                            )
                              return (
                                <td
                                  key={cIdx}
                                  className={`border border-gray-300 px-4 py-2 text-sm ${
                                    cIdx === 1 ? "text-left" : "text-center"
                                  }`}
                                ></td>
                              );
                            return (
                              <td
                                key={cIdx}
                                className={`border border-gray-300 px-4 py-2 text-sm ${
                                  cIdx === 1 ? "text-left" : "text-center"
                                }`}
                              >
                                {cell}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              }

              return (
                <tr key={idx} className="hover:bg-gray-50">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`border border-gray-300 px-4 py-2 text-sm ${
                        cIdx === 1 ? "text-left" : "text-center"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}

          {data?.summary &&
            (Array.isArray(data.summary) ? (
              <tr className="font-medium bg-gray-100">
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 text-sm font-bold text-left"
                >
                  {data.summary[0]}
                </td>
                {data.summary.slice(1).map((cell, idx) => (
                  <td
                    key={idx}
                    className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ) : (
              Object.values(data.summary).map((row, idx) => (
                <tr
                  key={idx}
                  className="font-medium bg-gray-50 hover:bg-gray-100"
                >
                  {row.map((cell, cIdx) => {
                    if (
                      isTable5 &&
                      cIdx >= row.length - 2 &&
                      (cell === 0 || cell === "0")
                    ) {
                      return (
                        <td
                          key={cIdx}
                          className={`border border-gray-300 px-4 py-2 text-sm font-semibold ${
                            cIdx === 1 ? "text-left" : "text-center"
                          }`}
                        ></td>
                      );
                    }
                    return (
                      <td
                        key={cIdx}
                        className={`border border-gray-300 px-4 py-2 text-sm font-semibold ${
                          cIdx === 1 ? "text-left" : "text-center"
                        }`}
                      >
                        {cell || ""}
                      </td>
                    );
                  })}
                </tr>
              ))
            ))}
        </tbody>
      </table>
    </div>
  );
};
