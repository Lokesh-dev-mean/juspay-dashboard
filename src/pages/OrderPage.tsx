import React, { useMemo, useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  Checkbox,
  Pagination,
  InputBase,
  CircularProgress,
  Alert,
} from '@mui/material';
import Search from '../assets/icons/Search.svg'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ClipboardText from '../assets/icons/ClipboardText.svg';
import ArrowsDownUpIcon from '../assets/icons/ArrowsDownUp.svg';

// Import types and hooks
import type {  OrderFilters, PaginationParams } from '../types';
import { useOrders } from '../hooks/useOrders';
import { getStatusColor } from '../utils/orderUtils';

export const OrderPage: React.FC = () => {
  const theme = useTheme();
  
  // Local state for UI controls
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [projectFilter, setProjectFilter] = useState<string>('All');

  // Create filters and pagination objects
  const filters: OrderFilters = useMemo(() => ({
    searchTerm: searchTerm || undefined,
    status: statusFilter !== 'All' ? statusFilter : undefined,
    project: projectFilter !== 'All' ? projectFilter : undefined,
  }), [searchTerm, statusFilter, projectFilter]);

  const pagination: PaginationParams = useMemo(() => ({
    page,
    limit: rowsPerPage,
  }), [page, rowsPerPage]);

  // Use the custom hook
  const { orders, loading, error, totalPages, fetchOrders } = useOrders(filters, pagination);

  // Fetch data when filters or pagination change
  useEffect(() => {
    fetchOrders(filters, pagination);
  }, [filters, pagination, fetchOrders]);

  // Reset page when filters change
  useEffect(() => {
    if (page > 0) {
      setPage(0);
    }
  }, [searchTerm, statusFilter, projectFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1); // MUI Pagination is 1-indexed, but our API is 0-indexed
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = orders
        .filter((order) => order.showCheckbox)
        .map((order) => order.id);
      setSelected(prev => [...prev.filter(id => !newSelected.includes(id)), ...newSelected]);
      return;
    }
    // When unchecked, only remove selections from current page
    const currentPageIds = orders
      .filter((order) => order.showCheckbox)
      .map((order) => order.id);
    setSelected(prev => prev.filter(id => !currentPageIds.includes(id)));
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const isAllSelected = useMemo(() => {
    const checkableItems = orders.filter((order) => order.showCheckbox);
    if (checkableItems.length === 0) return false;
    
    const checkableIds = checkableItems.map((order) => order.id);
    
    return checkableIds.every(id => selected.includes(id));
  }, [orders, selected]);

   

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: theme.palette.background.default,
      width: 'calc(100% - 1px)',
    }}>
      <Typography
        gutterBottom
        sx={{
          paddingX: "8px",
          paddingY: "4px",
          fontWeight: "600",
          fontSize: "14px",
          mb: '12px',
        }}
      >
        Order List
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Simplified Filter Bar */}
      <Box sx={{ 
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#F7F9FB',
        borderRadius: 2,
        p: '8px',
        mb: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between'
      }}>
        {/* Left side - Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <AddIcon sx={{ fontSize: '20px', color: theme.palette.text.primary }} />
          </IconButton>
          
          <IconButton
            size="small"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <FilterListIcon sx={{ fontSize: '20px', color: theme.palette.text.primary }} />
          </IconButton>
          
          <IconButton
            size="small"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <img src={ArrowsDownUpIcon} alt="ArrowsDownUpIcon" style={{ width: '20px', height: '20px' , filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none' }} />
          </IconButton>
        </Box>

        {/* Right side - Search input */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '8px', 
            border: `1px solid ${theme.palette.mode === 'dark' ? '#393939' : '#E4E5E7'}`,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : '#FFFFFF',
            marginRight: '12px',
            width: '160px',
            height:'28px',
          }}
        >
          <Box sx={{ position: 'absolute', paddingLeft:'8px',paddingY:'6px', display: 'flex', alignItems: 'center' }}>
            <img src={Search} alt="Search" style={{ width: 16, height: 16,color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#CECFD0',filter: theme.palette.mode === 'dark' ? 'invert(0.7)' : 'none' }} />
          </Box>
          <InputBase
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            sx={{
              borderRadius: '8px',
              paddingX:'28px',
              paddingY:'4px',
              fontFamily: 'Inter',
              color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#CECFD0',
              fontWeight: 400,
              fontSize: '14px',
              height:'28px',
            }}
          />
        </Box>
      </Box>

      {/* Table Container */}
      <Box sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Loading overlay */}
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
            <CircularProgress size={24} />
          </Box>
        )}

        <TableContainer sx={{ 
          width: '100%',
        }}>
          <Table sx={{ overflowX: 'auto' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent',height: '40px' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && !isAllSelected}
                    checked={isAllSelected}
                    onChange={handleSelectAllClick}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: '16px' },
                    borderRadius: '4px',
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)',
                    '&.Mui-checked': {
                      color: theme.palette.mode === 'dark' ? 'rgba(198, 199, 248, 1)' : 'rgba(28, 28, 28, 1)',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: theme.palette.mode === 'dark' ? 'rgba(198, 199, 248, 1)' : 'rgba(28, 28, 28, 1)',
                    },
                  }}
                  />
                </TableCell>
                <TableCell sx={{ 
                    color: 'tableHeader', fontSize: '12px', lineHeight: '18px', padding: '11px 12px 11px 0px', borderBottomColor: 'tableHeaderBorder',
                }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ 
                  color: 'tableHeader', fontSize: '12px', lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableHeaderBorder',
                }}>
                  User
                </TableCell>
                <TableCell sx={{ 
                  color: 'tableHeader', fontSize: '12px', lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableHeaderBorder',
                }}>
                  Project
                </TableCell>
                <TableCell sx={{ 
                  color: 'tableHeader', fontSize: '12px', lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableHeaderBorder',
                }}>
                  Address
                </TableCell>
                <TableCell sx={{ 
                    color: 'tableHeader', fontSize: '12px', lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableHeaderBorder',
                }}>
                  Date
                </TableCell>
                <TableCell sx={{ 
                  color: 'tableHeader', fontSize: '12px', lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableHeaderBorder',
                }}>
                  Status
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => {
                const isItemSelected = isSelected(order.id);
                return (
                  <TableRow
                    key={`${order.id}-${page * rowsPerPage + index}`}
                    hover
                    onClick={order.showCheckbox ? (event) => handleClick(event, order.id) : undefined}
                    selected={isItemSelected}
                    sx={{ 
                      cursor: order.showCheckbox ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: order.showCheckbox 
                          ? (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)')
                          : 'transparent'
                      }
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ borderBottomColor: 'tableRowBorder' }}>
                    {order.showCheckbox && (
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => {
                          event.stopPropagation();
                          const selectedIndex = selected.indexOf(order.id);
                          let newSelected: string[] = [];
                          
                          if (selectedIndex === -1) {
                            newSelected = newSelected.concat(selected, order.id);
                          } else {
                            newSelected = selected.filter(id => id !== order.id);
                          }
                          setSelected(newSelected);
                        }}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: '16px' },
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)',
                        '&.Mui-checked': {
                          color: theme.palette.mode === 'dark' ? 'rgba(198, 199, 248, 1)' : 'rgba(28, 28, 28, 1)',
                        },
                        }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ 
                      padding: '11px 12px 11px 0px',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400,
                      borderBottomColor: 'tableRowBorder',
                    }}>
                      {order.id}
                    </TableCell>
                    <TableCell sx={{  
                      lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableRowBorder',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar
                          src={order.user.avatar}
                          alt={order.user.name}
                          sx={{ width: 20, height: 20 }}
                        />
                        <Typography sx={{ 
                          color: 'tableBody',
                          fontSize: '12px',
                          fontWeight: 400
                        }}>
                          {order.user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableRowBorder',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400
                    }}>
                      {order.project}
                    </TableCell>
                    <TableCell sx={{ 
                      lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableRowBorder',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400
                    }}>
                      {order.address}
                      {order.shoClipboardText && (
                        <IconButton  sx={{ p: 0, marginLeft: '4px', color: 'tableBody' }}>
                          <img src={ClipboardText} alt="ClipboardText" style={{ width: '16px', height: '16px' , filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none' }}/>
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell sx={{ 
                      lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableRowBorder',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarTodayIcon sx={{ 
                          fontSize: '16px', 
                          color: 'tableBody' 
                        }} />
                        <Typography sx={{ 
                          color: 'tableBody',
                          fontSize: '12px',
                          fontWeight: 400
                        }}>
                          {order.dateLabel}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      lineHeight: '18px', padding: '11px 12px', borderBottomColor: 'tableRowBorder',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400
                    }}>
                      <Chip
                        label={order.status}
                        size="small"
                        icon={
                          <Box
                            sx={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: getStatusColor(order.status, theme),
                              m: '5px'
                            }}
                          />
                        }
                        sx={{
                          color: getStatusColor(order.status, theme),
                          backgroundColor: 'transparent',
                          fontSize: '12px',
                          fontWeight: 400,
                          borderRadius: '16px',
                          height: '24px',
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      lineHeight: '18px', padding: '11px 12px',
                      color: 'tableBody',
                      fontSize: '12px',
                      fontWeight: 400,
                      borderBottomColor: 'tableRowBorder',
                    }}>
                      {order.showMoreVert && (
                        <IconButton 
                          sx={{ color: 'tableBody',  p: 0 }}
                        >
                          <MoreVertIcon sx={{ color: 'tableBody' , rotate: '90deg', fontSize: '16px' }} />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Pagination 
          count={totalPages}  
          page={page + 1} // MUI Pagination is 1-indexed
          onChange={handleChangePage}
          shape="rounded" 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            marginTop: '12px',
            p: 2,
            '.css-1gfkmrm-MuiButtonBase-root-MuiPaginationItem-root': {
              minWidth: '28px',
              height: '28px',
            }
          }} 
        />
      </Box>
    </Box>
  );
};