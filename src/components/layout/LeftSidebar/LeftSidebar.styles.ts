import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

export const DRAWER_WIDTH = 280;

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    '& .MuiListItemButton-root': {
      borderRadius: '8px',
      margin: '2px 0',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '& .MuiListItemIcon-root': {
          color: theme.palette.primary.contrastText,
        },
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    '& .MuiListItemIcon-root': {
      minWidth: 40,
      color: theme.palette.text.secondary,
    },
  },
}));