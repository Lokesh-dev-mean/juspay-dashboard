export interface User {
    name: string;
    avatar: string;
  }
  
  export type OrderStatus = 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
  
  export interface OrderData {
    id: string;
    user: User;
    project: string;
    address: string;
    date: string;
    dateLabel: string;
    status: OrderStatus;
    showCheckbox: boolean;
    showMoreVert: boolean;
    shoClipboardText: boolean;
  }
  
  export interface OrderFilters {
    searchTerm?: string;
    status?: string;
    project?: string;
    dateRange?: {
      start: string;
      end: string;
    };
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface OrderResponse {
    data: OrderData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }

  
// Activity data interface
export interface Activity {
  avatar: string;
  title: string;
  timestamp: string;
}
