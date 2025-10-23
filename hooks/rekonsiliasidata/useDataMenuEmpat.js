// hooks\rekonsiliasidata\useDataFetching.js
import { useState, useEffect } from "react";

export const useDataFetching = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    rangeData: null,
    cabangData: null,
    feedbackData: [],
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, table3, cabang, range, feedback] = await Promise.all([
          fetch("https://quickwin-jateng.vercel.app/api/sheet4/getsheet4table1").then(r => r.json()),
          fetch("https://quickwin-jateng.vercel.app/api/sheet4/getsheet4table2").then(r => r.json()),
          fetch("https://quickwin-jateng.vercel.app/api/sheet4/getsheet4table3").then(r => r.json()),
          fetch("https://quickwin-jateng.vercel.app/api/sheet4/getsheet4card").then(r => r.json()),
          fetch("https://quickwin-jateng.vercel.app/api/sheet4/getRange-sheet4").then(r => r.json()),
          fetch("https://quickwin-jateng.vercel.app/api/feedback/read").then(r => r.json()),
        ]);

        setState({
          table1Data: table1,
          table2Data: table2,
          table3Data: table3,
          cabangData: cabang,
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