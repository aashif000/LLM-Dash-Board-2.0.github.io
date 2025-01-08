import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
} from "recharts";
import { ModelData } from "@/types/data";
import { convertPriceToNumber, convertSizeToNumber } from "@/utils/sorting";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface ChartsDialogProps {
  data: ModelData[];
}

export function ChartsDialog({ data }: ChartsDialogProps) {
  const sizeData = data
    .filter((item) => item.size !== "N/A")
    .map((item) => ({
      name: item.name,
      size: convertSizeToNumber(item.size),
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);

  // Prepare data for price distribution
  const priceData = data
    .map((item) => ({
      name: item.name,
      price: convertPriceToNumber(item.Pricing),
    }))
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  // Prepare data for type distribution
  const typeData = data.reduce((acc: { name: string; value: number }[], item) => {
    const existingType = acc.find((type) => type.name === item.Type);
    if (existingType) {
      existingType.value += 1;
    } else {
      acc.push({ name: item.Type, value: 1 });
    }
    return acc;
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Charts</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Model Analytics</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Top Model Sizes</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer className="h-[200px]" config={{}}>
                <BarChart data={sizeData}>
                  <Bar dataKey="size" fill="#8884d8" />
                  <ChartTooltip />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Top Model Prices</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer className="h-[200px]" config={{}}>
                <BarChart data={priceData}>
                  <Bar dataKey="price" fill="#82ca9d" />
                  <ChartTooltip />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Type Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer className="h-[200px]" config={{}}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {typeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <ChartLegend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Size Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer className="h-[200px]" config={{}}>
                <LineChart data={sizeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="size" stroke="#8884d8" />
                  <ChartTooltip />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Price Area</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer className="h-[200px]" config={{}}>
                <AreaChart data={priceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Area type="monotone" dataKey="price" fill="#82ca9d" />
                  <ChartTooltip />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Type Distribution (Radial)</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer className="h-[200px]" config={{}}>
                <RadialBarChart
                  innerRadius="10%"
                  outerRadius="80%"
                  data={typeData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    label={{ fill: '#666', position: 'insideStart' }}
                    background
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </RadialBar>
                  <ChartLegend />
                  <ChartTooltip />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
