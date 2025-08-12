import React from 'react';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function StatsCard({ title, value, description, icon, valueColor = '' }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function DashboardStats() {
  const stats = [
    {
      title: 'Total Program',
      value: 18,
      description: '5 Quickwin + 13 Action Plan',
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Selesai',
      value: 12,
      description: '+2 dari bulan lalu',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      valueColor: 'text-green-600',
    },
    {
      title: 'Dalam Progress',
      value: 5,
      description: 'Sedang dikerjakan',
      icon: <Clock className="h-4 w-4 text-blue-600" />,
      valueColor: 'text-blue-600',
    },
    {
      title: 'Terlambat',
      value: 1,
      description: 'Perlu perhatian',
      icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
      valueColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default DashboardStats;
