"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AddCabangForm({
  newCabang,
  setNewCabang,
  handleAddCabang,
  isSubmitting,
}) {
  return (
    <motion.form
      onSubmit={handleAddCabang}
      className="flex gap-3 items-center bg-white p-4 rounded-2xl shadow-md border border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Input */}
      <motion.div
        className="flex-1"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          type="text"
          placeholder="Masukkan nama cabang baru..."
          value={newCabang}
          onChange={(e) => setNewCabang(e.target.value)}
          className="h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting || !newCabang.trim()}
          className="h-11 px-6 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Tambah
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
