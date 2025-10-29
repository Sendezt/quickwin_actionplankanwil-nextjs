import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FileDropzone } from "./FileDropzone";

export const EditFeedbackDialog = ({
  open,
  onOpenChange,
  editingData,
  formData,
  setFormData,
  saving,
  onSave,
  onRevert,
}) => {
  const isCompleted = editingData?.status === "selesai";
  const isInProgress = editingData?.status === "proses";

  const getDialogDescription = () => {
    if (isCompleted) {
      return "Feedback telah selesai. Anda dapat mengedit task atau mengembalikannya ke status proses.";
    }
    if (isInProgress) {
      return "Perbarui task atau unggah file untuk menyelesaikan feedback.";
    }
    return "Perbarui informasi feedback.";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Feedback</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto px-1 [&::-webkit-scrollbar]:hidden scrollbar-none">
          <div>
            <Label className="pb-1">Feedback</Label>
            <Input
              value={formData.task}
              onChange={(e) =>
                setFormData({ ...formData, task: e.target.value })
              }
            />
          </div>

          {isInProgress && (
            <div>
              <Label className="pb-1">Upload File Bukti</Label>
              <FileDropzone
                file={formData.file}
                onFileSelect={(file) => setFormData({ ...formData, file })}
                onFileRemove={() => setFormData({ ...formData, file: null })}
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-wrap justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>

          {isCompleted ? (
            <>
              <Button disabled={saving} onClick={onSave}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Edit Task"
                )}
              </Button>
              <Button
                variant="destructive"
                disabled={saving}
                onClick={onRevert}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Kembalikan ke Proses"
                )}
              </Button>
            </>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={saving}
              onClick={onSave}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
