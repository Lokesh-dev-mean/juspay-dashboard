export interface LayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export interface TopBarProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

export interface MainContentProps {
  children: React.ReactNode;
}

// Breadcrumb interfaces
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

// Activity interfaces
export interface Activity {
  avatar: string;
  title: string;
  timestamp: string;
}

// Contact interfaces
export interface Contact {
  avatar: string;
  name: string;
}

// Notification interfaces
export interface Notification {
  icon: string;
  type: 'bug' | 'user' | 'bell';
  message: string;
  timestamp: string;
  bgColor?: string;
}

// Tree view interfaces
export interface TreeViewItem {
  id: string;
  label: string;
  children?: TreeViewItem[];
}

export interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
}

export interface CustomTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  itemId: string;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
}



// Activity data interface
export interface Contact {
  avatar: string;
  name: string;
}

export interface Notification {
  icon: string;
  type: 'bug' | 'user' | 'bell';
  message: string;
  timestamp: string;
  bgColor?: string;
}

export interface Activity {
  avatar: string;
  title: string;
  timestamp: string;
}