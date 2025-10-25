// hooks\pendataanterlibatlaka\useDataMenuTigaBelas.js
import { useState, useEffect } from "react";

const API_BASE_URL = "https://quickwin-jateng.vercel.app/api";

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
          fetch(`${API_BASE_URL}/sheet13/getsheet13table1`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sheet13/getsheet13table2`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sheet13/getRange-sheet13`).then(r => r.json()),
          fetch(`${API_BASE_URL}/feedback/read`).then(r => r.json()),
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
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  return state;
};