import { styled } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar as MuiToolbar, Box, IconButton } from '@mui/material';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.text.border}`,
  position: 'sticky',
  top: 0,
  width: '100%',
}));

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  paddingLeft: '28px !important',
  paddingRight: '28px !important',
  paddingTop: '20px !important',
  paddingBottom: '20px !important',
}));

export const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '28px',
});

export const ActionButton = styled(IconButton)(({ theme }) => ({
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  '&:hover': {
    color: theme.palette.text.primary,
    borderRadius: '8px',
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : '#F3F3F3',
  marginRight: '12px',
  width: '160px',
  height: '28px',
}));

export const SearchIconContainer = styled(Box)({
  position: 'absolute',
  paddingLeft: '8px',
  paddingTop: '6px',
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
});

export const SearchShortcut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.2)' 
    : '#969696',
  fontSize: '12px',
  opacity: 0.7,
}));