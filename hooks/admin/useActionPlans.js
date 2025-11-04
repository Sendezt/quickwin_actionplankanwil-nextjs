
// hooks\admin\useActionPlans.js
import { useState, useCallback } from 'react';

export const useActionPlans = (baseUrl) => {
  const [actionPlans, setActionPlans] = useState([]);

  const fetchActionPlans = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/actionplan`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setActionPlans(data || []);
    } catch (err) {
      console.error('Gagal memuat action plan:', err);
    }
  }, [baseUrl]);

  return { actionPlans, fetchActionPlans };
};
