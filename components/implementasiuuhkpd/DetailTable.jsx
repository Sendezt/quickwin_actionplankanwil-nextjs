"use client";

import useSWR from "swr";

export default function DetailTable({ loket }) {
  const loketMap = {
    Kanwil: "LOKET KANWIL",
    Pekalongan: "CAB PEKALONGAN",
    Surakarta: "CAB SURAKARTA",
    Pati: "CAB PATI",
    Magelang: "CAB MAGELANG",
    Semarang: "CAB SEMARANG",
    Purwokerto: "CAB PURWOKERTO",
    Sukoharjo: "CAB SUKOHARJO",
  };

  const targetName = loketMap[loket] || loket;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetcher untuk SWR
  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Pakai SWR dengan key unik per-loket supaya cache terpisah
  const { data, error, isLoading } = useSWR(
    `detail-${targetName}`, // key cache
    () =>
      fetcher(`${BASE_URL}/api/sheet1/getsheet1Detail`),
    { revalidateOnFocus: false }
  );

  if (isLoading) return <div className="p-2 text-sm">Loading...</div>;
  if (error) return <div className="p-2 text-sm">Gagal memuat data</div>;
  if (!data) return <div className="p-2 text-sm">Data tidak tersedia</div>;

  // Cari grup sesuai loket
  const group = data.groups.find(
    (g) => g.name.toLowerCase() === targetName.toLowerCase()
  );

  // Filter header → hapus kolom "No", kosong, dan duplikat
  const rawHeader = data.header[0] || [];
  const filteredHeader = [
    ...new Set(
      rawHeader.filter((h) => h.trim() !== "" && h.toLowerCase() !== "no")
    ),
  ];

  // Filter data → hanya kolom yang dibutuhkan
  const filteredData =
    group?.data?.map((row) => ({
      kab: row.kab,
      pelaksanaan: row.pelaksanaan,
    })) || [];

  return (
    <table className="w-full table-auto border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {filteredHeader.map((h, idx) => (
            <th
              key={idx}
              className="border px-2 py-1 text-center text-sm font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-200">
          <td
            colSpan={filteredHeader.length}
            className="px-2 py-1 font-semibold"
          >
            {group?.name || "Data tidak ditemukan"}
          </td>
        </tr>
        {filteredData.length > 0 ? (
          filteredData.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="border px-2 py-1 text-center">{row.kab}</td>
              <td className="border px-2 py-1 text-center">
                {row.pelaksanaan?.toLowerCase() === "ya" ? (
                  <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-green-800 text-xs font-semibold">
                    Ya
                  </span>
                ) : (
                  <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-red-800 text-xs font-semibold">
                    Tidak
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={filteredHeader.length}
              className="px-2 py-1 text-center text-sm italic"
            >
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
