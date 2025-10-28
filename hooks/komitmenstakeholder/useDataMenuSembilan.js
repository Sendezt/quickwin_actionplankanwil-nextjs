// hooks\komitmenstakeholder\useDataMenuSembilan.js
import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;;

const API_ENDPOINTS = {
  table1: `${BASE_URL}/api/sheet9/getsheet9table1`,
  table2: `${BASE_URL}/api/sheet9/getsheet9table2`,
  table3: `${BASE_URL}/api/sheet9/getsheet9table3`,
  table4: `${BASE_URL}/api/sheet9/getsheet9table4`,
  breakdown: `${BASE_URL}/api/sheet9/getsheet9card`,
  range: `${BASE_URL}/api/sheet9/getRange-sheet9`,
  feedback: `${BASE_URL}/api/feedback/read`,
};

export const useDataMenuSembilan = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    table4Data: null,
    breakdownData: null,
    rangeData: null,
    feedback: null,
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [table1, table2, table3, table4, breakdown, range, feedback] = await Promise.all([
          fetch(API_ENDPOINTS.table1).then(r => r.json()),
          fetch(API_ENDPOINTS.table2).then(r => r.json()),
          fetch(API_ENDPOINTS.table3).then(r => r.json()),
          fetch(API_ENDPOINTS.table4).then(r => r.json()),
          fetch(API_ENDPOINTS.breakdown).then(r => r.json()),
          fetch(API_ENDPOINTS.range).then(r => r.json()),
          fetch(API_ENDPOINTS.feedback).then(r => r.json()),
        ]);

        setState({
          table1Data: table1,
          table2Data: table2,
          table3Data: table3,
          table4Data: table4,
          breakdownData: breakdown,
          rangeData: range,
          feedback: feedback,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  return state;
};