import type { OrderData } from '../types/order';
import type { Theme } from '@mui/material/styles';

export const getStatusColor = (status: OrderData['status'], theme: Theme): string => {
  switch (status) {
    case 'In Progress':
      return 'rgba(138, 140, 217, 1)';
    case 'Complete':
      return 'rgba(74, 167, 133, 1)';
    case 'Pending':
      return 'rgba(89, 168, 212, 1)';
    case 'Approved':
      return 'rgba(255, 197, 85, 1)';
    case 'Rejected':
      return theme.palette.mode !== 'dark' ? 'rgba(28, 28, 28, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    default:
      return 'rgba(255, 255, 255, 0.4)';
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};