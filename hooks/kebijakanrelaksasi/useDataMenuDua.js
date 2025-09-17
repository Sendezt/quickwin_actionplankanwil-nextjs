import { useState, useEffect } from "react";

// API Service functions
const apiService = {
  fetchMainData: async () => {
    const res = await fetch(
      "https://magangproject.vercel.app/api/sheet2/getsheet2"
    );
    return res.json();
  },

  fetchBreakdownData: async () => {
    const res = await fetch(
      "https://magangproject.vercel.app/api/sheet2/getsheet2card"
    );
    return res.json();
  },

  fetchRangeData: async () => {
    const res = await fetch(
      "https://magangproject.vercel.app/api/sheet2/getRange-sheet2"
    );
    return res.json();
  },

  fetchFeedbackData: async () => {
    const res = await fetch("http://localhost:3000/api/feedback/read");
    return res.json();
  },
};

// Custom hook for MenuDua data management
export const useMenuDuaData = () => {
  const [state, setState] = useState({
    tableData: null,
    table1Data: null,
    breakdownData: null,
    rangeData: null,
    feedbackData: null,
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all data concurrently
        const [mainData, breakdownData, rangeData, feedbackData] = await Promise.all([
          apiService.fetchMainData(),
          apiService.fetchBreakdownData(),
          apiService.fetchRangeData(),
          apiService.fetchFeedbackData(),
        ]);

        setState({
          tableData: mainData.table2,
          table1Data: mainData.table1,
          breakdownData: breakdownData,
          rangeData: rangeData,
          feedbackData: feedbackData,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  return state;
};
