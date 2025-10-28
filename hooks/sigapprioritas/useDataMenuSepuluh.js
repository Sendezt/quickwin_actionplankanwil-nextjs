import { useEffect, useState } from "react";

export function useDataMenuTen() {
  const [loading, setLoading] = useState(true);
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [t1, t2, t3, t4, range, feedback] = await Promise.all([
          fetch(
            `${BASE_URL}/api/sheet10/getsheet10table1`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet10/getsheet10table2`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet10/getsheet10table3`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet10/getsheet10table4`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet10/getRange-sheet10`
          ).then((r) => r.json()),
          fetch(`${BASE_URL}/api/feedback/read`).then(
            (r) => r.json()
          ),
        ]);
        setTable1Data(t1);
        setTable2Data(t2);
        setTable3Data(t3);
        setTable4Data(t4);
        setRangeData(range);
        setFeedbackData(feedback);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return {
    loading,
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    rangeData,
    feedbackData,
  };
}
