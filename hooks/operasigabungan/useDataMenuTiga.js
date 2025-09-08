import { useState, useEffect } from "react";

const API_ENDPOINTS = {
  table1: "https://magangproject.vercel.app/api/google/getsheet3table1",
  table2: "https://magangproject.vercel.app/api/google/getsheet3table2",
  table3: "https://magangproject.vercel.app/api/google/getsheet3table3",
  table4: "https://magangproject.vercel.app/api/google/getsheet3table4",
  table5: "https://magangproject.vercel.app/api/google/getsheet3table5",
  breakdown: "https://magangproject.vercel.app/api/google/getsheet3card",
  range: "https://magangproject.vercel.app/api/google/getRange-sheet3",
};

export function useDataMenuTiga() {
  const [data, setData] = useState({
    table1: null,
    table2: null,
    table3: null,
    table4: null,
    table5: null,
    breakdown: null,
    range: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch table data in parallel
        const [table1Res, table2Res, table3Res, table4Res, table5Res] =
          await Promise.all([
            fetch(API_ENDPOINTS.table1),
            fetch(API_ENDPOINTS.table2),
            fetch(API_ENDPOINTS.table3),
            fetch(API_ENDPOINTS.table4),
            fetch(API_ENDPOINTS.table5),
          ]);

        const [table1Json, table2Json, table3Json, table4Json, table5Json] =
          await Promise.all([
            table1Res.json(),
            table2Res.json(),
            table3Res.json(),
            table4Res.json(),
            table5Res.json(),
          ]);

        // Fetch additional data
        const [breakdownRes, rangeRes] = await Promise.all([
          fetch(API_ENDPOINTS.breakdown),
          fetch(API_ENDPOINTS.range),
        ]);

        const [breakdownJson, rangeJson] = await Promise.all([
          breakdownRes.json(),
          rangeRes.json(),
        ]);

        setData({
          table1: table1Json,
          table2: table2Json,
          table3: table3Json,
          table4: table4Json,
          table5: table5Json,
          breakdown: breakdownJson,
          range: rangeJson,
        });
      } catch (error) {
        console.error("Gagal fetch data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Computed values
  const totalSkor = data.breakdown?.data?.reduce((total, item) => total + item.skor, 0) ?? 0;
  const targetSkor = 4;

  return {
    ...data,
    loading,
    error,
    totalSkor,
    targetSkor,
  };
}