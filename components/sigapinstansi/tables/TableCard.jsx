// ============ FILE: components/tables/TableCard.jsx ============
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TableCard = ({ title, children, showFeedback = false, onFeedbackClick }) => (
  <Card>
    <CardHeader>
      {showFeedback ? (
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onFeedbackClick}
            className="cursor-pointer hover:bg-blue-600 hover:text-white transition"
          >
            Feedback
          </Button>
        </div>
      ) : (
        <CardTitle className="text-xl">{title}</CardTitle>
      )}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);