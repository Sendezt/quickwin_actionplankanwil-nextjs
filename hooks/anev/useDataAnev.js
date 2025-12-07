import { useEffect, useState } from "react";

export const useTableData = (initialMonth = "januari") => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [data1, setData1] = useState([]);
  const [header1, setHeader1] = useState([]);
  const [result1, setResult1] = useState([]);
  const [data2, setData2] = useState([]);
  const [header2, setHeader2] = useState([]);
  const [result2, setResult2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchData = async (bulan) => {
    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        fetch(`${baseURL}/api/anev/getDataTable1?bulan=${bulan}`),
        fetch(`${baseURL}/api/anev/getDataTable2?bulan=${bulan}`)
      ]);
      const [json1, json2] = await Promise.all([res1.json(), res2.json()])
      setHeader1(json1.header);
      setData1(json1.data);
      setResult1(json1.result);
      setHeader2(json2.header);
      setData2(json2.data);
      setResult2(json2.result);
      setMessage(json1.message || json2.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  return {
    selectedMonth,
    setSelectedMonth,
    data1,
    header1,
    result1,
    data2,
    header2,
    result2,
    loading,
    message,
  };
};
