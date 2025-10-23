// components\komitmenstakeholder\tables\DataTable.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const DataTable = ({ title, description, children }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);