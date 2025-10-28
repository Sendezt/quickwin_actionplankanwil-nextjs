// hooks\signalonline\useDataMenuTujuh.js
import { useState, useEffect } from "react";

export const useDataMenuTujuh = () => {
  const [state, setState] = useState({
    table1Data: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, range, feedback] = await Promise.all([
          fetch(
            `${BASE_URL}/api/sheet7/getsheet7table1`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet7/getRange-sheet7`
          ).then((r) => r.json()),
          fetch(`${BASE_URL}/api/feedback/read`).then(
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
