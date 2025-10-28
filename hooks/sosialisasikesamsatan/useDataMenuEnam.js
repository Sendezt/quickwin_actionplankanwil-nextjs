// hooks\sosialisasikesamsatan\useDataMenuEnam.js
import { useState, useEffect } from "react";

export const useMenuEnamData = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    table4Data: null,
    table5Data: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, table3, table4, table5, feedback, range] = await Promise.all([
          fetch(`${BASE_URL}/api/sheet6/getsheet6table1`).then(r => r.json()),
          fetch(`${BASE_URL}/api/sheet6/getsheet6table2`).then(r => r.json()),
          fetch(`${BASE_URL}/api/sheet6/getsheet6table3`).then(r => r.json()),
          fetch(`${BASE_URL}/api/sheet6/getsheet6table4`).then(r => r.json()),
          fetch(`${BASE_URL}/api/sheet6/getsheet6table5`).then(r => r.json()),
          fetch(`${BASE_URL}/api/feedback/read`).then(r => r.json()),
          fetch(`${BASE_URL}/api/sheet6/getRange-sheet6`).then(r => r.json()),
        ]);

        setState({
          table1Data: table1,
          table2Data: table2,
          table3Data: table3,
          table4Data: table4,
          table5Data: table5,
          feedbackData: feedback,
          rangeData: range,
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