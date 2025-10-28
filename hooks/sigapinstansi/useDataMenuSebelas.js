// hooks\sigapinstansi\useDataMenuSebelas.js
import { useState, useEffect } from "react";


export const useDataMenuSebelas = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    table4Data: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, table3, table4, range, feedback] =
          await Promise.all([
            fetch(`${BASE_URL}/api/sheet11/getsheet11table1`).then((r) =>
              r.json()
            ),
            fetch(`${BASE_URL}/api/sheet11/getsheet11table2`).then((r) =>
              r.json()
            ),
            fetch(`${BASE_URL}/api/sheet11/getsheet11table3`).then((r) =>
              r.json()
            ),
            fetch(`${BASE_URL}/api/sheet11/getsheet11table4`).then((r) =>
              r.json()
            ),
            fetch(`${BASE_URL}/api/sheet11/getRange-sheet11`).then((r) =>
              r.json()
            ),
            fetch(`${BASE_URL}/api/feedback/read`).then((r) => r.json()),
          ]);

        setState({
          table1Data: table1,
          table2Data: table2,
          table3Data: table3,
          table4Data: table4,
          rangeData: range,
          feedbackData: feedback,
          loading: false,
        });
      } catch (error) {
        console.error("Gagal fetch data:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  return state;
};
