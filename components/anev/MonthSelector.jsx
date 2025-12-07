import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const bulanList = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];

  return (
    <div className="mb-4">
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Pilih Bulan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Bulan</SelectLabel>
            {bulanList.map((bulan) => (
              <SelectItem key={bulan} value={bulan}>
                {bulan.charAt(0).toUpperCase() + bulan.slice(1)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthSelector;
