// hooks\admin\useCabangs.js
import { useState, useCallback } from 'react';

export const useCabangs = (baseUrl) => {
  const [cabangs, setCabangs] = useState([]);

  const fetchCabangs = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/cabang/read`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCabangs(data || []);
    } catch (err) {
      console.error('Gagal memuat cabang:', err);
    }
  }, [baseUrl]);

  return { cabangs, fetchCabangs };
};