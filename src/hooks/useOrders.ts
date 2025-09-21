import { useState, useEffect, useCallback } from 'react';
import { OrderApi } from '../api/orderApi';
import type { OrderData, OrderFilters, PaginationParams } from '../types';

interface UseOrdersState {
  orders: OrderData[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
}

interface UseOrdersReturn extends UseOrdersState {
  fetchOrders: (filters?: OrderFilters, pagination?: PaginationParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useOrders = (
  initialFilters: OrderFilters = {},
  initialPagination: PaginationParams = { page: 0, limit: 10 }
): UseOrdersReturn => {
  const [state, setState] = useState<UseOrdersState>({
    orders: [],
    loading: false,
    error: null,
    total: 0,
    totalPages: 0,
  });

  const [currentFilters, setCurrentFilters] = useState(initialFilters);
  const [currentPagination, setCurrentPagination] = useState(initialPagination);

  const fetchOrders = useCallback(async (
    filters: OrderFilters = currentFilters,
    pagination: PaginationParams = currentPagination
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await OrderApi.getOrders(filters, pagination);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          orders: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
          loading: false,
        }));
        setCurrentFilters(filters);
        setCurrentPagination(pagination);
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'Failed to fetch orders',
          loading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        loading: false,
      }));
    }
  }, [currentFilters, currentPagination]);

  const refetch = useCallback(() => {
    return fetchOrders(currentFilters, currentPagination);
  }, [fetchOrders, currentFilters, currentPagination]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    ...state,
    fetchOrders,
    refetch,
  };
};