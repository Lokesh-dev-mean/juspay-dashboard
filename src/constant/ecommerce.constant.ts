import type { ChartData, ChartConfig, MetricData, LocationData, RevenueLegendItem, RevenueData, ProductData } from '../types/ecommerce';

export const CHART_DATA: ChartData[] = [
    {
      name: 'Actuals',
      data: [15, 18, 15, 20, 12, 15],
      color: {
        light: 'rgba(168, 197, 218, 1)',
        dark: 'rgba(168, 197, 218, 1)',
      },
      borderRadius: [0, 0, 0, 0],
    },
    {
      name: 'Projections',
      data: [3, 4, 3, 5, 3, 4],
      color: {
        light: 'rgba(207, 222, 234, 1)',
        dark: '#464D53',
      },
      borderRadius: [4, 4, 0, 0],
    },
  ] as const;
  
  export const CHART_CONFIG: ChartConfig = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    yAxisMax: 30,
    yAxisInterval: 10,
    barWidth: '30%',
    height: '168px',
  } as const;
  
  export const CHART_STYLES = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '24px !important',
      gap: '16px',
      borderRadius: '16px',
      width: '100%',
    },
    title: {
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Inter, sans-serif',
    },
    chartWrapper: {
      flex: 1,
      width: '100%',
    },
  } as const;
  
  export const THEME_COLORS = {
    axis: {
      light: '#00000080',
      dark: '#ffffff80',
    },
    splitLine: {
      light: '#00000020',
      dark: '#ffffff20',
    },
    tooltip: {
      background: {
        light: '#FFFFFF',
        dark: '#1C2A53',
      },
      border: {
        light: '#00000020',
        dark: '#3366FF40',
      },
      text: {
        light: '#000000',
        dark: '#FFFFFF',
      },
    },
  } as const;


  export const METRICS_DATA: MetricData[] = [
    {
      title: "Customers",
      value: "3,781",
      percentageChange: 11.01,
      light: "rgba(227, 245, 255, 1)",
      dark: "rgba(227, 245, 255, 1)",
      textDark: "rgba(0, 0, 0, 1)",
      textLight: "rgba(0, 0, 0, 1)",
      trend: "up" as const,
    },
    {
      title: "Orders",
      value: "1,219",
      light: "rgba(247, 249, 251, 1)",
      dark: "rgba(255, 255, 255, 0.05)",
      textDark: "rgba(255, 255, 255, 1)",
      textLight: "rgba(0, 0, 0, 1)",
      percentageChange: -0.03,
      trend: "down" as const,
    },
    {
      title: "Revenue",
      value: "$695",
      light: "rgba(247, 249, 251, 1)",
      dark: "rgba(255, 255, 255, 0.05)",
      textDark: "rgba(255, 255, 255, 1)",
      textLight: "rgba(0, 0, 0, 1)",
      percentageChange: 15.03,
      trend: "up" as const,
    },
    {
      title: "Growth",
      value: "30.1%",
      light: "rgba(229, 236, 246, 1)",
      dark: "rgba(229, 236, 246, 1)",
      textDark: "rgba(0, 0, 0, 1)",
      textLight: "rgba(0, 0, 0, 1)",
      percentageChange: 6.08,
      trend: "up" as const,
    },
  ];

export const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export const DEFAULT_LOCATIONS: LocationData[] = [
  { name: 'New York', coordinates: [-74.006, 40.7128], revenue: 72 },
  { name: 'San Francisco', coordinates: [-122.4194, 37.7749], revenue: 39 },
  { name: 'Sydney', coordinates: [151.2093, -33.8688], revenue: 25 },
  { name: 'Singapore', coordinates: [103.8198, 1.3521], revenue: 61 },
];

   

export const DEFAULT_DATA: RevenueData[] = [
  {
    name: 'Current Week',
    data: [10, 15, 13, 11, 15, 22, 24],
    color: 'dynamic', // Will be set based on theme
    lineStyle: { type: 'solid', width: 2 },
  },
  {
    name: 'Previous Week (Solid)',
    data: [15, 10.2, 11.5, 16.5, null, null, null],
    color: '#3366FF',
    lineStyle: { type: 'solid', width: 2 },
  },
  {
    name: 'Previous Week (Dashed)',
    data: [null, null, null, 16.5, 21, 22, 21],
    color: '#3366FF',
    lineStyle: { type: 'dashed', width: 2 },
  },
];

export const DEFAULT_LEGEND_ITEMS: RevenueLegendItem[] = [
  { label: 'Current Week', value: 58211, color: 'dynamic' },
  { label: 'Previous Week', value: 68768, color: '#3366FF' },
];

export const DEFAULT_PRODUCTS: ProductData[] = [
  { name: 'ASOS Ridley High Waist', price: 79.49, quantity: 82 },
  { name: 'Marco Lightweight Shirt', price: 128.5, quantity: 37 },
  { name: 'Half Sleeve Shirt', price: 39.99, quantity: 64 },
  { name: 'Lightweight Jacket', price: 20.0, quantity: 184 },
  { name: 'Marco Shoes', price: 79.49, quantity: 64 },
];

export const TABLE_STYLES = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 3,
    gap: 0.5,
    borderRadius: 2,
    width: '100%',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
  },
  tableContainer: {
    padding: '0px !important',
  },
  headerCell: {
    fontSize: '12px',
    lineHeight: '18px',
    padding: '11px 12px',
    fontFamily: "'Inter', sans-serif",
  },
  bodyCell: {
    fontSize: '12px',
    lineHeight: '18px',
    padding: '11px 12px',
    borderBottom: '0px solid',
    fontFamily: "'Inter', sans-serif",
  },
} as const;
