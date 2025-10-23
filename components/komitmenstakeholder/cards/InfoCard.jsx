// components\komitmenstakeholder\cards\InfoCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InfoCard = ({ title, icon: Icon, children }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-2 px-6 text-sm">{children}</CardContent>
  </Card>
);