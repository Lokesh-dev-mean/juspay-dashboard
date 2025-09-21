import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface SidebarState {
  isLeftSidebarOpen: boolean;
  isRightSidebarOpen: boolean;
}

type SidebarAction = 
  | { type: 'TOGGLE_LEFT_SIDEBAR' }
  | { type: 'TOGGLE_RIGHT_SIDEBAR' }
  | { type: 'SET_LEFT_SIDEBAR'; payload: boolean }
  | { type: 'SET_RIGHT_SIDEBAR'; payload: boolean }
  | { type: 'CLOSE_RIGHT_SIDEBAR_ON_ORDERS' }
  | { type: 'RESTORE_FROM_STORAGE'; payload: SidebarState };

interface SidebarContextType {
  state: SidebarState;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setLeftSidebar: (open: boolean) => void;
  setRightSidebar: (open: boolean) => void;
  closeRightSidebarOnOrders: () => void;
}

const STORAGE_KEY = 'sidebar-state';

const initialState: SidebarState = {
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
};

const sidebarReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case 'TOGGLE_LEFT_SIDEBAR':
      return { ...state, isLeftSidebarOpen: !state.isLeftSidebarOpen };
    case 'TOGGLE_RIGHT_SIDEBAR':
      return { ...state, isRightSidebarOpen: !state.isRightSidebarOpen };
    case 'SET_LEFT_SIDEBAR':
      return { ...state, isLeftSidebarOpen: action.payload };
    case 'SET_RIGHT_SIDEBAR':
      return { ...state, isRightSidebarOpen: action.payload };
    case 'CLOSE_RIGHT_SIDEBAR_ON_ORDERS':
      return { ...state, isRightSidebarOpen: false };
    case 'RESTORE_FROM_STORAGE':
      return action.payload;
    default:
      return state;
  }
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState) as SidebarState;
        dispatch({ type: 'RESTORE_FROM_STORAGE', payload: parsedState });
      }
    } catch (error) {
      console.error('Error loading sidebar state from localStorage:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving sidebar state to localStorage:', error);
    }
  }, [state]);

  const toggleLeftSidebar = () => {
    dispatch({ type: 'TOGGLE_LEFT_SIDEBAR' });
  };

  const toggleRightSidebar = () => {
    dispatch({ type: 'TOGGLE_RIGHT_SIDEBAR' });
  };

  const setLeftSidebar = (open: boolean) => {
    dispatch({ type: 'SET_LEFT_SIDEBAR', payload: open });
  };

  const setRightSidebar = (open: boolean) => {
    dispatch({ type: 'SET_RIGHT_SIDEBAR', payload: open });
  };

  const closeRightSidebarOnOrders = () => {
    dispatch({ type: 'CLOSE_RIGHT_SIDEBAR_ON_ORDERS' });
  };

  return (
    <SidebarContext.Provider
      value={{
        state,
        toggleLeftSidebar,
        toggleRightSidebar,
        setLeftSidebar,
        setRightSidebar,
        closeRightSidebarOnOrders,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
