import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModelData } from "@/types/data";
import { convertPriceToNumber, convertSizeToNumber } from "@/utils/sorting";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DataTableProps {
  data: ModelData[];
}

type SortConfig = {
  key: keyof ModelData;
  direction: "asc" | "desc";
} | null;

export const DataTable = ({ data }: DataTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    let comparison = 0;
    switch (sortConfig.key) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "size":
        comparison = convertSizeToNumber(a.size) - convertSizeToNumber(b.size);
        break;
      case "Pricing":
        comparison = convertPriceToNumber(a.Pricing) - convertPriceToNumber(b.Pricing);
        break;
      default:
        comparison = String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]));
    }

    return sortConfig.direction === "asc" ? comparison : -comparison;
  });

  const handleSort = (key: keyof ModelData) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc"
          ? { key, direction: "desc" }
          : null;
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: keyof ModelData) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="h-8 px-2 lg:px-3"
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
                {getSortIcon("name")}
              </Button>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("size")}
                className="h-8 px-2 lg:px-3"
              >
                Size
                <ArrowUpDown className="ml-2 h-4 w-4" />
                {getSortIcon("size")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("Pricing")}
                className="h-8 px-2 lg:px-3"
              >
                Pricing
                <ArrowUpDown className="ml-2 h-4 w-4" />
                {getSortIcon("Pricing")}
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={item.name + index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.Pricing}</TableCell>
              <TableCell>{item.Type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};