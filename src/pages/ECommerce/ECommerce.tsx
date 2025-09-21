import React, { useMemo } from "react";
import { Typography, Grid, Box, useTheme, CardContent, LinearProgress, TableCell, TableRow, TableBody, Table, TableContainer, TableHead } from "@mui/material";
import { MetricCard } from "../../components/ui/MetricCard";
import { CHART_CONFIG, CHART_DATA, CHART_STYLES, THEME_COLORS, METRICS_DATA, DEFAULT_LEGEND_ITEMS, DEFAULT_DATA, DEFAULT_PRODUCTS, TABLE_STYLES } from "../../constant/ecommerce.constant";
import { PAGE_STYLES } from "./ECommerce.styles";
import ReactECharts, { type EChartsOption } from 'echarts-for-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { GEO_URL, DEFAULT_LOCATIONS } from "../../constant/ecommerce.constant";
import { calculateAmount, formatCurrency } from "../../utils/formatters";
import DonutChart from "../../assets/icons/DonutChart.svg"; 

 
 
export const ECommerce: React.FC = () => {

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const maxRevenue = Math.max(...DEFAULT_LOCATIONS.map((location) => location.revenue));


  const chartOption = useMemo(() => ({
    grid: {
      left: '0%',
      right: '4%',
      bottom: '0%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: CHART_CONFIG.months,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 15,
        color: isDark ? THEME_COLORS.axis.dark : THEME_COLORS.axis.light,
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      max: CHART_CONFIG.yAxisMax,
      interval: CHART_CONFIG.yAxisInterval,
      axisLabel: {
        formatter: '{value}M',
        color: isDark ? THEME_COLORS.axis.dark : THEME_COLORS.axis.light,
      },
      splitLine: {
        lineStyle: {
          color: isDark ? THEME_COLORS.splitLine.dark : THEME_COLORS.splitLine.light,
          type: 'solid',
        },
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: CHART_DATA.map((item) => ({
      name: item.name,
      type: 'bar',
      stack: 'total',
      data: item.data,
      barWidth: CHART_CONFIG.barWidth,
      itemStyle: {
        color: isDark ? item.color.dark : item.color.light,
        borderRadius: item.borderRadius,
      },
    })),
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: isDark 
        ? THEME_COLORS.tooltip.background.dark 
        : THEME_COLORS.tooltip.background.light,
      borderColor: isDark 
        ? THEME_COLORS.tooltip.border.dark 
        : THEME_COLORS.tooltip.border.light,
      textStyle: {
        color: isDark 
          ? THEME_COLORS.tooltip.text.dark 
          : THEME_COLORS.tooltip.text.light,
      },
    },
  }), [isDark]);

  
  const revenueChartOption: EChartsOption = {
    grid: {
      left: '1%',
      right: '4%',
      bottom: '0%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 15,
        color: isDark ? '#ffffff80' : '#00000080',
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      max: 30,
      interval: 10,
      axisLabel: {
        formatter: '{value}M',
        color: isDark ? '#ffffff80' : '#00000080',
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#ffffff20' : '#00000020',
          type: 'solid',
        },
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: DEFAULT_DATA.map((series) => ({
      name: series.name,
      type: 'line',
      smooth: true,
      data: series.data,
      symbolSize: 0,
      lineStyle: {
        width: series.lineStyle.width,
        color: series.color === 'dynamic' ? isDark ? '#fff' : '#000' : series.color,
        type: series.lineStyle.type,
        cap: 'round',
        join: 'round',
      },
      areaStyle: { opacity: 0 },
    })),
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#1C2A53' : '#FFFFFF',
      borderColor: isDark ? '#3366FF40' : '#00000020',
      textStyle: { color: isDark ? '#FFFFFF' : '#000000' },
    },
  };

  const salesData = [
    { name: 'Direct', value: 300.56, color: '#1a1a1a' },
    { name: 'Affiliate', value: 154.02, color: '#86efac' },
    { name: 'Sponsored', value: 135.18, color: '#8b5cf6' },
    { name: 'E-mail', value: 48.96, color: '#7dd3fc' },
  ];



  const metrics = useMemo(() => METRICS_DATA, []);

  const metricCards = useMemo(() => 
    metrics.map((metric, index) => (
      <Box key={`metric-${index}-${metric.title}`} sx={PAGE_STYLES.metricCardWrapper}>
        <MetricCard {...metric} />
      </Box>
    )), [metrics]
  );


  const processedProducts = useMemo(
    () =>
      DEFAULT_PRODUCTS.map((product) => ({
        ...product,
        amount: calculateAmount(product.price, product.quantity),
      })),
    [DEFAULT_PRODUCTS]
  );


  return (
    <Box sx={PAGE_STYLES.container}>
      <Typography
        variant="h4"
        gutterBottom
        sx={PAGE_STYLES.title}
      >
        eCommerce
      </Typography>
      
      <Box sx={PAGE_STYLES.content}>
        {/* Metrics and Projections Section */}
        <Grid container sx={PAGE_STYLES.metricsGrid}>
          <Grid container sx={PAGE_STYLES.metricsContainer}>
            {metricCards}
          </Grid>
          <Box>
          <CardContent 
              sx={{
                ...CHART_STYLES.container,
                backgroundColor: theme.palette.background.chart,
              }}
            >
              <Typography 
                sx={{ 
                  ...CHART_STYLES.title,
                  color: theme.palette.text.primary,
                }}
              >
                Projections vs Actuals
              </Typography>
              
              <Box sx={CHART_STYLES.chartWrapper}>
                <ReactECharts 
                  option={chartOption}
                  style={{ height: CHART_CONFIG.height, width: '100%' }}
                />
              </Box>
            </CardContent>
          </Box>
        </Grid>

        {/* Revenue and Location Section */}
        <Box sx={PAGE_STYLES.chartSection}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                gap: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.chart,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Revenue
                </Typography>

                <Typography
                  sx={{
                    color: theme.palette.text.divider,
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  |
                </Typography>

                {DEFAULT_LEGEND_ITEMS.map((item, index) => (
                  <Box
                    key={`${item.label}-${index}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 0.5,
                      paddingX: 1,
                      paddingY: 0.25,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        margin: 0.5,
                        borderRadius: '50%',
                        bgcolor: item.color === 'dynamic' ? isDark ? '#fff' : '#000' : item.color,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '12px',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item.label} ${item.value.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ flex: 1, width: '100%' }}>
                <ReactECharts
                  option={revenueChartOption}
                  style={{ height: '232px', width: '100%' }}
                  opts={{ renderer: 'canvas' }}
                />
              </Box>
            </CardContent>

          <Box
        sx={{
          borderRadius: 2,
          display: 'flex',
          padding: 3,
          flexDirection: 'column',
          gap: 2,
          backgroundColor: theme.palette.background.chart,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Revenue by Location
        </Typography>

        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [20, 45] }}
            style={{
              width: '100%',
              height: '82px',
            }}
          >
           
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: Geography[] }) =>
                geographies.map((geo: Geography) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isDark ? '#474E54' : '#CFDFEA'}
                    stroke={isDark ? '#474E54' : '#CFDFEA'}
                  />
                ))
              }
            </Geographies>
           
            {DEFAULT_LOCATIONS.map(({ name, coordinates }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle
                  r={20}
                  fill={isDark ? '#C6C7F8' : 'black'}
                  stroke="white"
                  strokeWidth={6}
                />
              </Marker>
            ))}
          </ComposableMap>
        </Box>

        {DEFAULT_LOCATIONS.map((location) => (
          <Box key={location.name}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {location.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {location.revenue.toFixed(0)}K
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(location.revenue / maxRevenue) * 100}
              sx={{
                height: 2,
                borderRadius: 10,
                backgroundColor: isDark ? '#323639' : '#E0E0E0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: isDark
                    ? 'rgba(168, 197, 218, 1)'
                    : '#42A5F5',
                },
              }}
            />
          </Box>
        ))}
          </Box>
           
        </Box>

        {/* Top Selling and Total Sales Section */}
        <Box sx={PAGE_STYLES.chartSection}>
            <CardContent
              sx={{
                ...TABLE_STYLES.container,
                backgroundColor: theme.palette.background.chart,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  ...TABLE_STYLES.title,
                  color: theme.palette.text.primary,
                }}
              >
                Top Selling Products
              </Typography>

              <TableContainer sx={{ ...TABLE_STYLES.tableContainer, height: '264px' }}>
                <Table size="small" aria-label="top-selling-products">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          ...TABLE_STYLES.headerCell,
                          color: theme.palette.text.secondary,
                          borderBottomColor: theme.palette.divider,
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          ...TABLE_STYLES.headerCell,
                          color: theme.palette.text.secondary,
                          borderBottomColor: theme.palette.divider,
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        sx={{
                          ...TABLE_STYLES.headerCell,
                          color: theme.palette.text.secondary,
                          borderBottomColor: theme.palette.divider,
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        sx={{
                          ...TABLE_STYLES.headerCell,
                          color: theme.palette.text.secondary,
                          borderBottomColor: theme.palette.divider,
                        }}
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {processedProducts.map((product) => (
                      <TableRow key={product.name} hover>
                        <TableCell
                          sx={{
                            ...TABLE_STYLES.bodyCell,
                            color: theme.palette.text.primary,
                            borderBottomColor: theme.palette.divider,
                          }}
                        >
                          {product.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...TABLE_STYLES.bodyCell,
                            color: theme.palette.text.primary,
                            borderBottomColor: theme.palette.divider,
                          }}
                        >
                          {formatCurrency(product.price)}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...TABLE_STYLES.bodyCell,
                            color: theme.palette.text.primary,
                            borderBottomColor: theme.palette.divider,
                          }}
                        >
                          {product.quantity}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...TABLE_STYLES.bodyCell,
                            color: theme.palette.text.primary,
                            borderBottomColor: theme.palette.divider,
                          }}
                        >
                          {formatCurrency(product.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>  
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px !important',
                gap: '16px',
                borderRadius: '16px',
                backgroundColor: theme.palette.background.chart,
                width: '100%'
              }}
            >
              <Typography 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontSize: '14px', 
                  fontWeight: 600 
                }}
              >
                Total Sales
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: '16px', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <img src={DonutChart} style={{width: 120, height: 120}} alt="donut-chart" />
 
    
                 <Box 
                  sx={{ 
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column', 
                    gap: '12px', 
                    justifyContent: 'center' 
                  }}
                >
                  {salesData.map((item) => (
                    <Box 
                      key={item.name} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        width: '100%', 
                        height: '22px', 
                        justifyContent: 'space-between' 
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 6, 
                            margin: '5px', 
                            height: 6, 
                            borderRadius: '50%', 
                            backgroundColor: item.color 
                          }} 
                        />
                        <Typography 
                          sx={{ 
                            color: theme.palette.text.primary, 
                            fontSize: '12px', 
                            lineHeight: '18px' 
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                      <Typography 
                        sx={{ 
                          color: theme.palette.text.primary, 
                          fontSize: '12px', 
                          lineHeight: '18px' 
                        }}
                      >
                        ${item.value.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
        </Box>
      </Box>
    </Box>
  );
};
