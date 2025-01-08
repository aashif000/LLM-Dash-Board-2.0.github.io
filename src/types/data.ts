export interface ModelData {
  name: string;
  description: string;
  size: string;
  Pricing: string;
  Type: string;
}

export interface FilterState {
  search: string;
  types: string[];
}

export interface ChartData {
  name: string;
  value: number;
}

export interface SizeChartData {
  name: string;
  size: number;
}

export interface PriceChartData {
  name: string;
  price: number;
}