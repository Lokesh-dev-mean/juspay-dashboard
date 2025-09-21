import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography, InputBase } from '@mui/material';
import { useThemeMode } from '../../../context/ThemeModeContext';
import { 
  AppBar, 
  Toolbar, 
  LeftSection, 
  RightSection, 
  ActionButton,
  SearchContainer,
  SearchIconContainer,
  SearchShortcut
} from './TopBar.styles';
import type { TopBarProps, BreadcrumbItem } from '../../../types/layout';

// Icons
import Sidebar from '../../../assets/icons/Sidebar.svg';
import Star from '../../../assets/icons/Star.svg';
import Search from '../../../assets/icons/Search.svg';
import Sun from '../../../assets/icons/Sun.svg';
import ClockCounterClockwise from '../../../assets/icons/ClockCounterClockwise.svg';
import Bell from '../../../assets/icons/Bell.svg';

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  switch (pathname) {
    case '/ecommerce':
      return [{ label: 'Dashboards' }, { label: 'eCommerce' }];
    case '/default':
      return [{ label: 'Dashboards' }, { label: 'Default' }];
    default:
      return [{ label: 'Dashboards' }, { label: 'Default' }];
  }
};

export const TopBar: React.FC<TopBarProps> = ({ 
  onToggleLeftSidebar, 
  onToggleRightSidebar 
}) => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  const getIconFilter = (isDark: boolean) => isDark ? 'invert(0.7)' : 'none';

  return (
    <AppBar position="fixed">
      <Toolbar>
        <LeftSection>
          <ActionButton size="small" onClick={onToggleLeftSidebar}>
            <img 
              src={Sidebar} 
              alt="Sidebar" 
              style={{ 
                width: 20, 
                height: 20,
                filter: getIconFilter(isDarkMode)
              }} 
            />
          </ActionButton>

          <ActionButton size="small">
            <img 
              src={Star} 
              alt="Star" 
              style={{ 
                width: 20, 
                height: 20,
                filter: getIconFilter(isDarkMode)
              }} 
            />
          </ActionButton>

          <Breadcrumbs separator="/" aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => (
              <Typography 
                key={index}
                color={
                  index === breadcrumbs.length - 1 
                    ? isDarkMode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"
                    : isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(28, 28, 28, 0.4)"
                }
                sx={{ 
                  fontSize: '14px',
                  paddingX: '8px',
                  paddingY: '4px',
                  fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
                  cursor: index === breadcrumbs.length - 1 ? 'default' : 'pointer',
                  '&:hover': index === breadcrumbs.length - 1 ? {} : { color: 'text.primary' }
                }}
              >
                {breadcrumb.label}
              </Typography>
            ))}
          </Breadcrumbs>
        </LeftSection>

        <RightSection>
          <SearchContainer>
            <SearchIconContainer>
              <img 
                src={Search} 
                alt="Search" 
                style={{ 
                  width: 16, 
                  height: 16,
                  filter: getIconFilter(isDarkMode)
                }} 
              />
            </SearchIconContainer>
            <InputBase
              placeholder="Search..."
              sx={{
                borderRadius: '8px',
                paddingX: '28px',
                paddingY: '4px',
                fontFamily: 'Inter',
                color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#969696',
                fontWeight: 400,
                fontSize: '12px',
                height: '28px',
              }}
            />
            <SearchShortcut>⌘/</SearchShortcut>
          </SearchContainer>

          <ActionButton size="small" onClick={toggleTheme}>
            <img 
              src={Sun} 
              alt="Sun" 
              style={{ 
                width: 20, 
                height: 20,
                filter: getIconFilter(isDarkMode)
              }} 
            />
          </ActionButton>

          <ActionButton size="small">
            <img 
              src={ClockCounterClockwise} 
              alt="History" 
              style={{ 
                width: 20, 
                height: 20,
                filter: getIconFilter(isDarkMode)
              }} 
            />
          </ActionButton>

          <ActionButton size="small">
            <img 
              src={Bell} 
              alt="Notifications" 
              style={{ 
                width: 20, 
                height: 20,
                filter: getIconFilter(isDarkMode)
              }} 
            />
          </ActionButton>

          <ActionButton size="small" onClick={onToggleRightSidebar}>
            <img 
              src={Sidebar} 
              alt="Right Sidebar" 
              style={{ 
                width: 20, 
                height: 20,
                filter: getIconFilter(isDarkMode)
              }} 
            />
          </ActionButton>
        </RightSection>
      </Toolbar>
    </AppBar>
  );
};