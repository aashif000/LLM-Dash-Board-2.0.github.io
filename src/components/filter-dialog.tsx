import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterState } from "@/types/data";

interface FilterDialogProps {
  types: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterDialog = ({ types, filters, onFiltersChange }: FilterDialogProps) => {
  const handleTypeToggle = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    
    onFiltersChange({ ...filters, types: newTypes });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3">
          <FilterIcon className="h-4 w-4" />
          <span className="ml-2 hidden lg:inline">Filter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Types</h4>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                {types.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.types.includes(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                    />
                    <label
                      htmlFor={type}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};