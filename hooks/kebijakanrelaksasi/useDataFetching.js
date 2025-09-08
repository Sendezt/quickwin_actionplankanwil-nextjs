import { useState, useEffect } from "react";

export const useDataFetching = () => {
  const [tableData, setTableData] = useState(null);
  const [table1Data, setTable1Data] = useState(null);
  const [breakdownData, setBreakdownData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://magangproject.vercel.app/api/google";

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Parallel API calls untuk performa yang lebih baik
      const [mainRes, breakdownRes, rangeRes] = await Promise.all([
        fetch(`${API_BASE_URL}/getsheet2`),
        fetch(`${API_BASE_URL}/getsheet2card`),
        fetch(`${API_BASE_URL}/getRange-sheet2`)
      ]);

      // Check if all requests were successful
      if (!mainRes.ok) {
        throw new Error(`Failed to fetch main data: ${mainRes.status}`);
      }
      if (!breakdownRes.ok) {
        throw new Error(`Failed to fetch breakdown data: ${breakdownRes.status}`);
      }
      if (!rangeRes.ok) {
        throw new Error(`Failed to fetch range data: ${rangeRes.status}`);
      }

      // Parse all responses
      const [mainJson, breakdownJson, rangeJson] = await Promise.all([
        mainRes.json(),
        breakdownRes.json(),
        rangeRes.json()
      ]);

      // Validate data structure
      if (!mainJson.table2 || !mainJson.table1) {
        console.warn("Main data structure is incomplete:", mainJson);
      }

      // Set state
      setTableData(mainJson.table2);
      setTable1Data(mainJson.table1);
      setBreakdownData(breakdownJson);
      setRangeData(rangeJson);

    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Retry function untuk manual retry
  const retry = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    tableData,
    table1Data,
    breakdownData,
    rangeData,
    loading,
    error,
    retry
  };
};