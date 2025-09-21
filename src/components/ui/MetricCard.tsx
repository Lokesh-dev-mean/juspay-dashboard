import React from 'react';
import { useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { MetricCardProps } from '../../types/ecommerce';
import { StyledCardContent, MetricTitle, MetricContainer, MetricValue, PercentageChange } from '../../pages/ECommerce/ECommerce.styles';

/**
 * MetricCard component displays a metric with title, value, and trend information
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  percentageChange,
  trend,
  light,
  dark,
  textLight,
  textDark,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const backgroundColor = isDarkMode ? dark : light;
  const textColor = isDarkMode ? textDark : textLight;

  return (
    <StyledCardContent sx={{ backgroundColor }}>
      <MetricTitle sx={{ color: textColor }}>
        {title}
      </MetricTitle>
      <MetricContainer>
        <MetricValue sx={{ color: textColor }}>
          {value}
        </MetricValue>
        <PercentageChange trend={trend} sx={{ color: textColor }}>
          {percentageChange > 0 ? '+' : ''}{percentageChange}%
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ fontSize: '16px', marginRight: '0px !important' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: '16px', marginRight: '0px !important' }} />
          )}
        </PercentageChange>
      </MetricContainer>
    </StyledCardContent>
  );
};