import { useState } from "react";
import { useModelData } from "@/hooks/use-model-data";
import { DataTable } from "@/components/data-table";
import { FilterDialog } from "@/components/filter-dialog";
import { Input } from "@/components/ui/input";
import { FilterState } from "@/types/data";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartsDialog } from "@/components/charts-dialog";

const Index = () => {
  const { data, isLoading, isError } = useModelData();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    types: [],
  });

  const types = Array.from(new Set(data?.map((item) => item.Type) || []));

  const filteredData = (data || []).filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.types.length === 0 || filters.types.includes(item.Type);
    return matchesSearch && matchesType;
  });

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load data. Please try again later.",
    });
    return null;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 py-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-8"
          />
        </div>
        <FilterDialog
          types={types}
          filters={filters}
          onFiltersChange={setFilters}
        />
        <ChartsDialog data={filteredData} />
      </div>

      <div className="px-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <DataTable data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default Index;