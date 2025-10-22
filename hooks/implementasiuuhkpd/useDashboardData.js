// hooks\implementasiuuhkpd\useDashboardData.js
import { useEffect, useState } from "react";

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    let interval;

    const fetchFeedbackData = async () => {
      try {
        const res = await fetch(
          "https://quickwin-jateng.vercel.app/api/feedback/read"
        );
        const json = await res.json();
        setFeedbackData(json);
      } catch (err) {
        console.error("Gagal fetch feedbackData:", err);
      }
    };

    async function fetchData() {
      try {
        const res = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet1/getsheet1"
        );
        const json = await res.json();

        if (json && json.data && Array.isArray(json.data)) {
          setDashboardData(json);
        } else {
          console.warn("Struktur data tidak valid:", json);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet1/getRange-sheet1"
        );
        const json = await res.json();

        if (json) {
          setRangeData(json);
        } else {
          console.warn("Struktur data tidak valid", json);
        }
      } catch (err) {
        console.error("Gagal fetch getRange-sheet1: ", err);
      }
    }

    fetchData();
    fetchRangeData();
    fetchFeedbackData();
  }, []);

  return { dashboardData, rangeData, isLoading, feedbackData };
}
