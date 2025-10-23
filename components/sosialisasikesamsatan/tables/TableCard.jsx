// components\sosialisasikesamsatan\tables\TableCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TableCard = ({ title, children, showFeedback = false, onFeedbackClick }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className={showFeedback ? "" : "border-b"}>
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        {showFeedback && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFeedbackClick}
            className="cursor-pointer hover:bg-blue-600 hover:text-white transition"
          >
            Feedback
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
);
