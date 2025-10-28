// hooks\pendataanterlibatlaka\useDataMenuTigaBelas.js
import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useDataMenuTigabelas = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, range, feedback] = await Promise.all([
          fetch(`${BASE_URL}/api/sheet13/getsheet13table1`).then((r) =>
            r.json()
          ),
          fetch(`${BASE_URL}/api/sheet13/getsheet13table2`).then((r) =>
            r.json()
          ),
          fetch(`${BASE_URL}/api/sheet13/getRange-sheet13`).then((r) =>
            r.json()
          ),
          fetch(`${BASE_URL}/api/feedback/read`).then((r) => r.json()),
        ]);

        setState({
          table1Data: table1,
          table2Data: table2,
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
