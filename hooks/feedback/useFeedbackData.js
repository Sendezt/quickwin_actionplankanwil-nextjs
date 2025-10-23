import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  fetchFeedbacks,
  fetchCabangs,
  fetchActionPlans,
  createFeedback,
  updateFeedbackStatus,
} from "@/hooks/feedback/apifeedback";

export function useFeedbackData() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [actionPlans, setActionPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const [feedbacksData, cabangsData, actionPlansData] = await Promise.all([
        fetchFeedbacks(),
        fetchCabangs(),
        fetchActionPlans(),
      ]);

      setFeedbacks(feedbacksData || []);
      setCabangs(cabangsData || []);
      setActionPlans(actionPlansData || []);
    } catch (error) {
      toast.error("Gagal memuat data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    feedbacks,
    cabangs,
    actionPlans,
    isLoading,
    isRefreshing,
    loadData,
    setFeedbacks,
    setCabangs,
    setActionPlans,
  };
}
