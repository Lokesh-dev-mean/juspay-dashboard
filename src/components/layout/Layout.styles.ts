import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LayoutRoot = styled(Box)({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
});

export const SidebarContainer = styled(Box)<{ isOpen: boolean; side: 'left' | 'right' }>(
  ({ isOpen, side }) => ({
    position: 'absolute',
    [side]: 0,
    top: 0,
    bottom: 0,
    width: side === 'left' ? '212px' : '280px',
    transform: isOpen ? 'none' : `translateX(${side === 'left' ? '-100%' : '100%'})`,
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1200,
  })
);

export const MainContentContainer = styled(Box)<{ 
  leftSidebarOpen: boolean; 
  rightSidebarOpen: boolean 
}>(({ leftSidebarOpen, rightSidebarOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  marginLeft: leftSidebarOpen ? '212px' : 0,
  marginRight: rightSidebarOpen ? '280px' : 0,
  transition: 'margin 0.3s ease-in-out',
}));