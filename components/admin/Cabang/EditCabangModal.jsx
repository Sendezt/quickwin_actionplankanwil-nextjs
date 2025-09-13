"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit3, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EditCabangModal({
  open,
  setOpen,
  editNama,
  setEditNama,
  handleUpdateCabang,
  isUpdating,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-700">Edit Cabang</span>
          </DialogTitle>
          <DialogDescription>
            Perbarui nama cabang sesuai kebutuhan Anda.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateCabang} className="space-y-4">
          <Input
            type="text"
            value={editNama}
            onChange={(e) => setEditNama(e.target.value)}
            placeholder="Masukkan nama cabang..."
            className="h-10 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isUpdating}
          />
          <DialogFooter className="gap-2">
            {/* Tombol batal */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isUpdating}
                className="border-red-400 text-red-500 hover:bg-red-50 hover:border-red-500 transition-all duration-300"
              >
                Batal
              </Button>
            </motion.div>

            {/* Tombol simpan */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={isUpdating || !editNama.trim()}
                className={`transition-all duration-300 ${
                  isUpdating
                    ? "bg-indigo-400 text-white cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                }`}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </motion.div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
