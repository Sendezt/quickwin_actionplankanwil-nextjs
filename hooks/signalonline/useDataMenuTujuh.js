// hooks\signalonline\useDataMenuTujuh.js
import { useState, useEffect } from "react";

export const useDataMenuTujuh = () => {
  const [state, setState] = useState({
    table1Data: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, range, feedback] = await Promise.all([
          fetch(
            "https://quickwin-jateng.vercel.app/api/sheet7/getsheet7table1"
          ).then((r) => r.json()),
          fetch(
            "https://quickwin-jateng.vercel.app/api/sheet7/getRange-sheet7"
          ).then((r) => r.json()),
          fetch("https://quickwin-jateng.vercel.app/api/feedback/read").then(
            (r) => r.json()
          ),
        ]);

        setState({
          table1Data: table1,
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
