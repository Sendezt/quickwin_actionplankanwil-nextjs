// hooks\implementasiuuhkpd\useDashboardData.js
import { useEffect, useState } from "react";

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;

    async function fetchData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet1"
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
          "https://magangproject.vercel.app/api/google/getRange-sheet1"
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

    interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return { dashboardData, rangeData, isLoading };
}