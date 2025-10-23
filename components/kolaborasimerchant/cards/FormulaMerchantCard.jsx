// components\kolaborasimerchant\cards\FormulaMerchantCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export const FormulaMerchantCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1 px-6">
      <CardTitle className="text-xs font-medium">Forumula</CardTitle>
      <Radical className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-4">
      <div className="space-y-3 text-sm">
        <div className="border-l-4 border-gray-400 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            Jumlah merchant yang bekerja sama
          </p>
          <p className="text-gray-600 text-xs">
            = Jumlah merchant yang berhasil diajak kerjasama / Target (3 Merchant)
          </p>
        </div>
        <div className="border-l-4 border-gray-400 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            % Jumlah WP yang memanfaatkan fasilitas merchant
          </p>
          <p className="text-gray-600 text-xs">
            = Jumlah Wajib Pajak yang memanfaatkan fasilitas merchant / Target (10 Klaim per Merchant)
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
