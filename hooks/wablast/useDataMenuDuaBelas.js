// hooks\wablast\useDataMenuDuaBelas.js
import { useState, useEffect } from "react";

const API_BASE_URL = "https://quickwin-jateng.vercel.app/api";

export const useDataMenuDuabelas = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    table4Data: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, table3, table4, range, feedback] = await Promise.all([
          fetch(`${API_BASE_URL}/sheet12/getsheet12table1`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sheet12/getsheet12table2`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sheet12/getsheet12table3`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sheet12/getsheet12table4`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sheet12/getRange-sheet12`).then(r => r.json()),
          fetch(`${API_BASE_URL}/feedback/read`).then(r => r.json()),
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
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  return state;
};
