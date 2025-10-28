// hooks\keterisiandatavalid\useDataMenuLima.js
import { useState, useEffect } from "react";

export const useMenuLimaData = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    cabangData: null,
    rangeData: null,
    feedbackData: null,
    loading: true,
  });
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, cabang, feedback, range] = await Promise.all([
          fetch(
            `${BASE_URL}/api/sheet5/getsheet5table1`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet5/getsheet5table2`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet5/getsheet5card`
          ).then((r) => r.json()),
          fetch(`${BASE_URL}/api/feedback/read`).then(
            (r) => r.json()
          ),
          fetch(
            `${BASE_URL}/api/sheet5/getRange-sheet5`
          ).then((r) => r.json()),
        ]);

        setState({
          table1Data: table1,
          table2Data: table2,
          cabangData: cabang,
          feedbackData: feedback,
          rangeData: range,
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
