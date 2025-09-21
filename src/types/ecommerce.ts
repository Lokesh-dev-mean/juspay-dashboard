export interface ChartData {
    name: string;
    data: number[];
    color: {
      light: string;
      dark: string;
    };
    borderRadius: [number, number, number, number];
  }
  
export interface ChartConfig {
    months: string[];
    yAxisMax: number;
    yAxisInterval: number;
    barWidth: string;
    height: string;
  }

  export interface MetricData {
    title: string;
    value: string;
    percentageChange: number;
    trend: 'up' | 'down';
    light: string;
    dark: string;
    textDark: string;
    textLight: string;
  }

  export interface MetricCardProps {
    title: string;
    value: string | number;
    percentageChange: number;
    trend: 'up' | 'down';
    light: string;
    dark: string;
    textLight: string;
    textDark: string;
  }

  export interface LocationData {
    name: string;
    coordinates: [number, number];
    revenue: number;
  }
  
  export interface LocationCardProps {
    title?: string;
    locations?: LocationData[];
  }


  export interface RevenueData {
    name: string;
    data: (number | null)[];
    color: string;
    lineStyle: {
      type: 'solid' | 'dashed';
      width: number;
    };
  }
  
  export interface RevenueLegendItem {
    label: string;
    value: number;
    color: string;
  }
  
  export interface RevenueChartProps {
    title?: string;
    data?: RevenueData[];
    legendItems?: RevenueLegendItem[];
    height?: string;
    months?: string[];
    yAxisMax?: number;
    yAxisInterval?: number;
  }
  
  export interface Geography {
    rsmKey: string;
    properties: Record<string, any>;
    geometry: Record<string, any>;
  }


  export interface ProductData {
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface TopSellingTableProps {
    title?: string;
    products?: ProductData[];
    height?: string;
  }

  export interface DonutChartData {
    name: string;
    value: number;
    color: string;
  }
  
  export interface DonutChartProps {
    data: DonutChartData[];
    size?: number;
    strokeWidth?: number;
    showLabels?: boolean;
    showValues?: boolean;
    centerContent?: React.ReactNode;
    className?: string;
  }
  