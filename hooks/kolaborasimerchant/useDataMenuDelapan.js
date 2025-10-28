// hooks\kolaborasimerchant\useDataMenuDelapan.js
import { useState, useEffect } from "react";

export const useDataMenuDelapan = () => {
  const [state, setState] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    table4Data: null,
    table5Data: null,
    table6Data: null,
    table7Data: null,
    table8Data: null,
    breakdownData: null,
    rangeData: null,
    feedbackData: [],
    loading: true,
  });
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          table1,
          table2,
          table3,
          table4,
          table5,
          table6,
          table7,
          table8,
          breakdown,
          range,
          feedback,
        ] = await Promise.all([
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table1`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table4`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table2`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table5`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table3`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table6`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table7`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8table8`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getsheet8card`
          ).then((r) => r.json()),
          fetch(
            `${BASE_URL}/api/sheet8/getRange-sheet8`
          ).then((r) => r.json()),
          fetch(`${BASE_URL}/api/feedback/read`).then(
            (r) => r.json()
          ),
        ]);

        setState({
          table1Data: table1,
          table2Data: table2,
          table3Data: table3,
          table4Data: table4,
          table5Data: table5,
          table6Data: table6,
          table7Data: table7,
          table8Data: table8,
          breakdownData: breakdown,
          rangeData: range,
          feedbackData: feedback,
          loading: false,
        });
      } catch (error) {
        console.error("Gagal fetch data:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  return state;
};
