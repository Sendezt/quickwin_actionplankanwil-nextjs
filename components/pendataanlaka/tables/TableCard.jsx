// components\pendataanlaka\tables\TableCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TableCard = ({ title, children }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
