import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RenderTable from "@/components/sigapprioritas/RenderTable";
import RenderTableArray from "@/components/sigapprioritas/RenderTableArray";
import RenderTableFeedback from "@/components/sigapprioritas/RenderTableFeedback";
import { FeedbackModal } from "@/components/sigapprioritas/feedback/FeedbackModal";
import { useState } from "react";

export function TablesSection({ data, feedbackData }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">
            Skor Kontribusi Penerimaan{" "}
            <span className="text-red-700">SIGAP Prioritas</span> - Kanwil
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="hover:bg-blue-600 hover:text-white"
          >
            Feedback
          </Button>
        </CardHeader>
        <CardContent>
          <RenderTable data={data.table1Data} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Skor Kontribusi Penerimaan{" "}
            <span className="text-red-700">SIGAP Prioritas</span> - Per Cabang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RenderTableFeedback
            data={data.table2Data}
            feedbackData={feedbackData}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Skor Kontribusi Penerimaan{" "}
            <span className="text-red-700">SIGAP Prioritas</span> - Per Samsat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RenderTableArray data={data.table3Data} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Hasil Penerimaan Atas Kegiatan{" "}
            <span className="text-yellow-700">SIGAP Prioritas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RenderTableArray data={data.table4Data} />
        </CardContent>
      </Card>

      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        feedbackData={feedbackData}
      />
    </>
  );
}
