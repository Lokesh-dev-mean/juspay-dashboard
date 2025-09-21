import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';  
import { useSidebar } from '../../context/SidebarContext';
import type { LayoutProps } from '../../types';
import  { LayoutRoot, SidebarContainer, MainContentContainer } from './Layout.styles';
import { LeftSidebar } from './LeftSidebar/LeftSidebar';
import { RightSidebar } from './RightSidebar/RightSidebar';
import { TopBar } from './TopBar/TopBar';
import { Box } from '@mui/material';
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state, toggleLeftSidebar, toggleRightSidebar, closeRightSidebarOnOrders } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/orders') {
      closeRightSidebarOnOrders();
    }
  }, [location.pathname, closeRightSidebarOnOrders]);

  return (
    <LayoutRoot>
      {/* Left Sidebar */}
      <SidebarContainer 
        isOpen={state.isLeftSidebarOpen} 
        side="left"
        sx={{ bgcolor: 'background.paper' }}
      >
        <LeftSidebar />
      </SidebarContainer>

      {/* Main Content */}
      <MainContentContainer 
       
        leftSidebarOpen={state.isLeftSidebarOpen}
        rightSidebarOpen={state.isRightSidebarOpen}
      >
        <TopBar 
          onToggleLeftSidebar={toggleLeftSidebar} 
          onToggleRightSidebar={toggleRightSidebar} 
        />
        <Box sx={{padding: 0,
                  overflowY: 'auto',
                  width: 'calc(100% - 1px)',
                  flex: 1,}}>
          {children}
        </Box>
      </MainContentContainer>

      {/* Right Sidebar */}
      <SidebarContainer 
        isOpen={state.isRightSidebarOpen} 
        side="right"
        sx={{ bgcolor: 'background.paper' }}
      >
        <RightSidebar />
      </SidebarContainer>
    </LayoutRoot>
  );
};
