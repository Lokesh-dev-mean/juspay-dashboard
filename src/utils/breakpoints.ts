export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export const getBreakpoint = (width: number): string => {
  if (width < breakpoints.values.sm) return 'xs';
  if (width < breakpoints.values.md) return 'sm';
  if (width < breakpoints.values.lg) return 'md';
  if (width < breakpoints.values.xl) return 'lg';
  return 'xl';
};
