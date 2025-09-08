import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const DataTable = ({ data, title, type, loading }) => {
  if (loading) {
    const cols = type === "table1" ? data?.header?.[0]?.length || 6 : data?.headerBottom?.length || 6;
    return (
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton.Table rows={5} cols={cols} />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Data tidak tersedia
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          Rekapitulasi{" "}
          <span className="text-yellow-500">
            Pertumbuhan Penerimaan SW Periode Pemutihan
          </span>{" "}
          Per Cabang
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto w-full scrollbar-hide">
          {type === "table1" ? (
            <SimpleTable data={data} />
          ) : (
            <ComplexTable data={data} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Simple table untuk table1
const SimpleTable = ({ data }) => {
  if (!data?.header?.[0] || !data?.data) {
    return <div className="text-center py-4 text-muted-foreground">Data tidak valid</div>;
  }

  return (
    <Table className="min-w-max border border-gray-300 w-full">
      <TableHeader>
        <TableRow className="bg-gray-50">
          {data.header[0].map((head, i) => (
            <TableHead
              key={i}
              className={`
                min-w-[120px] border border-gray-300 font-semibold
                ${i === 1 ? "text-left" : "text-center"}
              `}
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {data.data.map((row, i) => (
          <TableRow key={i} className="hover:bg-gray-50 transition-colors">
            {row.map((cell, j) => (
              <TableCell
                key={j}
                className={`
                  border-b border-r border-dotted border-gray-300 py-3
                  ${j === 1 ? "text-left font-medium" : "text-center"}
                  ${j === 4 ? "font-semibold text-green-600" : ""}
                `}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      
      {data.summary && (
        <TableFooter>
          <TableRow className="bg-gray-100 font-bold">
            <TableCell
              colSpan={2}
              className="border border-gray-300 text-center font-bold"
            >
              {data.summary[0]}
            </TableCell>
            {data.summary.slice(1).map((cell, j) => (
              <TableCell
                key={j}
                className="border border-gray-300 text-center font-bold"
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

// Complex table untuk table2
const ComplexTable = ({ data }) => {
  const { headerTop, headerBottom, data: tableData, summary } = data || {};

  if (!headerTop || !headerBottom || !tableData) {
    return <div className="text-center py-4 text-muted-foreground">Data tidak valid</div>;
  }

  return (
    <Table className="min-w-max border border-gray-300 w-full">
      <TableHeader>
        {/* First header row */}
        <TableRow className="bg-gray-50">
          <TableHead
            rowSpan={2}
            className="text-center min-w-[120px] sticky left-0 bg-gray-50 border border-gray-300 z-10 px-2 py-3 font-semibold"
          >
            {headerTop[0][0]}
          </TableHead>
          {headerTop[0].slice(1).map((header, index) => {
            const isLastColumn = index === headerTop[0].length - 2;
            return (
              <TableHead
                key={index}
                colSpan={isLastColumn ? 4 : 1}
                className="text-center min-w-[150px] border border-gray-300 px-2 py-1 font-semibold"
              >
                {header}
              </TableHead>
            );
          })}
        </TableRow>
        
        {/* Second header row */}
        <TableRow className="bg-gray-50">
          {headerBottom.map((item, index) => (
            <TableHead
              key={index}
              className="text-center min-w-[120px] border border-gray-300 px-2 py-2 text-sm font-semibold"
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {tableData.map((row, rowIndex) => (
          <TableRow 
            key={rowIndex} 
            className="hover:bg-gray-50 transition-colors"
          >
            {row.map((cell, cellIndex) => {
              const isHighlighted = [3, 11, 12, 13, 14].includes(cellIndex);
              const isSticky = cellIndex === 0;
              
              return (
                <TableCell
                  key={cellIndex}
                  className={`
                    border-b border-r border-dotted border-gray-300 py-3
                    ${isSticky ? "text-left font-medium sticky left-0 bg-white z-10" : "text-center"}
                    ${isHighlighted ? "text-green-600 font-semibold" : ""}
                  `}
                >
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
      
      {summary && (
        <TableFooter>
          <TableRow className="bg-gray-100">
            {summary.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                className={`
                  font-bold border border-gray-300 py-3
                  ${cellIndex === 0 ? "text-left sticky left-0 bg-gray-100 z-10" : "text-center"}
                `}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};
