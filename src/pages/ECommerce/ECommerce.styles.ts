import { CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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


export const PAGE_STYLES = {
  container: {
    p: "28px"
  },
  title: {
    paddingX: "8px",
    paddingY: "4px",
    fontWeight: "600",
    fontSize: "14px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 3,
    "@media (max-width: 1280px)": {
      gridTemplateColumns: "1fr",
    },
  },
  metricsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "28px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  chartSection: {
    display: "grid",
    gridTemplateColumns: "72.2% 25%",
    gap: 3,
    width: "100%",
    overflow: "hidden",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  metricCardWrapper: {
    width: "100%"
  }
} as const;




export const MetricValue = styled(Typography)(( ) => ({
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: 1.5,
  fontFamily: "'Inter', sans-serif",
}));

export const MetricTitle = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
}));

  export const PercentageChange = styled(Box)<{ trend: 'up' | 'down' }>(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
  gap: '4px',
  fontWeight: 400,
  '& svg': {
    fontSize: '16px',
  },
}));

export const StyledCardContent = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px !important',
  gap: '8px',
  width: '100%',
  borderRadius: '16px',
}));

export const MetricContainer = styled(Box)(() => ({
  display: 'flex',  
  flexDirection: 'row',
  gap: '8px',
  justifyContent: 'space-between',
  alignItems: 'center',
}));


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