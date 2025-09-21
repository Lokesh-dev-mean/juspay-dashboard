import type { ApiResponse, OrderData, OrderFilters, PaginationParams, OrderResponse } from '../types';
import { mockOrderData } from '../constant/order.constant';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class OrderApi {
  static async getOrders(
    filters: OrderFilters = {},
    pagination: PaginationParams = { page: 0, limit: 10 }
  ): Promise<ApiResponse<OrderResponse>> {
    // Simulate network delay
    await delay(300);

    try {
      // Apply filters
      let filteredData = [...mockOrderData];

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredData = filteredData.filter((order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.user.name.toLowerCase().includes(searchLower) ||
          order.project.toLowerCase().includes(searchLower) ||
          order.address.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status && filters.status !== 'All') {
        filteredData = filteredData.filter((order) => order.status === filters.status);
      }

      if (filters.project && filters.project !== 'All') {
        filteredData = filteredData.filter((order) => order.project === filters.project);
      }

      // Apply pagination
      const total = filteredData.length;
      const totalPages = Math.ceil(total / pagination.limit);
      const startIndex = pagination.page * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      return {
        data: {
          data: paginatedData,
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages,
        },
        success: true,
      };
    } catch (error: unknown) {
      return {
        data: {
          data: [],
          total: 0,
          page: 0,
          limit: pagination.limit,
          totalPages: 0,
        },
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch orders',
      };
    }
  }

  static async getOrderById(id: string): Promise<ApiResponse<OrderData | null>> {
    await delay(200);

    try {
      const order = mockOrderData.find((order) => order.id === id);
      return {
        data: order || null,
        success: true,
      };
    } catch (error: unknown) {
      return {
        data: null,
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch order',
      };
    }
  }

  static async updateOrderStatus(id: string, status: OrderData['status']): Promise<ApiResponse<OrderData | null>> {
    await delay(300);

    try {
      const orderIndex = mockOrderData.findIndex((order) => order.id === id);
      if (orderIndex === -1) {
        return {
          data: null,
          success: false,
          message: 'Order not found',
        };
      }

      mockOrderData[orderIndex].status = status;
      return {
        data: mockOrderData[orderIndex],
        success: true,
      };
    } catch (error: unknown) {
      return {
        data: null,
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update order status',
      };
    }
  }

  static async deleteOrder(id: string): Promise<ApiResponse<boolean>> {
    await delay(300);

    try {
      const orderIndex = mockOrderData.findIndex((order) => order.id === id);
      if (orderIndex === -1) {
        return {
          data: false,
          success: false,
          message: 'Order not found',
        };
      }

      mockOrderData.splice(orderIndex, 1);
      return {
        data: true,
        success: true,
      };
    } catch (error: unknown) {
      return {
        data: false,
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete order',
      };
    }
  }

  // Get unique projects for filter dropdown
  static async getProjects(): Promise<ApiResponse<string[]>> {
    await delay(100);

    try {
      const projects = Array.from(new Set(mockOrderData.map(order => order.project)));
      return {
        data: projects,
        success: true,
      };
    } catch (error: unknown) {
      return {
        data: [],
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch projects',
      };
    }
  }

  // Get unique statuses for filter dropdown
  static async getStatuses(): Promise<ApiResponse<string[]>> {
    await delay(100);

    try {
      const statuses = Array.from(new Set(mockOrderData.map(order => order.status)));
      return {
        data: statuses,
        success: true,
      };
    } catch (error: unknown) {
      return {
        data: [],
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch statuses',
      };
    }
  }
}