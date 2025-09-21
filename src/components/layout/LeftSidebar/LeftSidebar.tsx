import React, { useState, useEffect } from "react"; 
import { styled, alpha } from "@mui/material/styles";
import { Box, Avatar, Typography, Collapse, Button } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useTreeItem } from "@mui/x-tree-view/useTreeItem";
import { TreeItemLabel, TreeItemIconContainer, type TreeItemProps } from "@mui/x-tree-view/TreeItem";
import { TreeItemIcon } from "@mui/x-tree-view/TreeItemIcon";
import { TreeItemProvider } from "@mui/x-tree-view/TreeItemProvider";
import type { TreeViewBaseItem } from "@mui/x-tree-view/models"; 
import { animated } from "@react-spring/web";
import BookOpen from "../../../assets/icons/BookOpen.svg";
import identificationBadgeIcon from "../../../assets/icons/IdentificationBadge.svg";
import IdentificationCard from "../../../assets/icons/IdentificationCard.svg";
import UsersThree from "../../../assets/icons/UsersThree.svg";
import Notebook from "../../../assets/icons/Notebook.svg";
import ChatsTeardrop from "../../../assets/icons/ChatsTeardrop.svg";
import FolderNotch from "../../../assets/icons/FolderNotch.svg";
import ShoppingBagOpen from "../../../assets/icons/ShoppingBagOpen.svg";
import ChartPieSlice from "../../../assets/icons/ChartPieSlice.svg";
import { useThemeMode } from '../../../hooks/useThemeMode';
import ByeWindImage from '../../../assets/images/ByeWind.png';
import { useLocation, useNavigate } from "react-router-dom";

const TreeItemRoot = styled("li")(({ theme }) => ({

  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0,
  color: theme.palette.text.secondary,
}));

const TreeItemContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  borderRadius: theme.spacing(1),
  position: "relative", 
  transition: 'all 0.2s ease-in-out',
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "4px",
    height: "16px",
    borderRadius: "12px",
    backgroundColor: "transparent",
    transition: "background-color 0.2s ease-in-out",
  },
  "&[data-selected]": {
    "&::before": {
      backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : '#1C1C1C',  
    }
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : 'rgba(28, 28, 28, 0.1)', // Updated this line
  },
}));

const CustomCollapse = styled(animated(Collapse))({
  padding: 0,
});

const TreeItemLabelText = styled(Typography)({
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  "&[data-selected]": {
    fontWeight: 500,
  }
});

interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
}

function CustomLabel({ icon: Icon, children, ...other }: CustomLabelProps) {
  const { isDarkMode } = useThemeMode();
  
  return (
    <TreeItemLabel
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
        color: isDarkMode ? '#fff' : '#1C1C1C',
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          color="inherit"
          sx={{ mr: 1, fontSize: "1.2rem" }}
        />
      )}
      <TreeItemLabelText variant="body2">{children}</TreeItemLabelText>
    </TreeItemLabel>
  );
}

const getIconForItem = (id: string) => {
  const { isDarkMode } = useThemeMode();
  
  switch (id) {
    case "default":
      return () => <img src={ChartPieSlice} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "user-profile":
      return () => <img src={identificationBadgeIcon} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "account":
      return () => <img src={IdentificationCard} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "corporate":
      return () => <img src={UsersThree} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "blog":
      return () => <img src={Notebook} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "social":
      return () => <img src={ChatsTeardrop} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "online-courses":
      return () => <img src={BookOpen} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "projects":
      return () => <img src={FolderNotch} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    case "ecommerce":
      return () => <img src={ShoppingBagOpen} width={20} height={20} style={{ marginRight: 4, filter: isDarkMode ? 'invert(1)' : 'none' }} />;
    default:
      return undefined;
  }
};

interface CustomTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  itemId: string;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const icon = getIconForItem(itemId);

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps(other)}>
        <TreeItemContent {...getContentProps()}>
          
          <TreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <CustomLabel {...getLabelProps({ icon })} />
        </TreeItemContent>
        {children && <CustomCollapse {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

 

const DASHBOARD_ITEMS: TreeViewBaseItem[] = [
  {
    id: "default",
    label: "Default",
    
  },
  {
    id: "ecommerce",
    label: "eCommerce",
    children: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
      { id: "customers", label: "Customers" },
    ]
  },
  {
    id: "projects",
    label: "Projects",
    children: [
      { id: "project-list", label: "Project List" },
      { id: "project-details", label: "Project Details" },
      { id: "tasks", label: "Tasks" },
    ]
  },
  {
    id: "online-courses",
    label: "Online Courses",
    children: [
      { id: "course-list", label: "Course List" },
      { id: "lessons", label: "Lessons" },
      { id: "students", label: "Students" },
    ]
  },
];

const PAGES_ITEMS: TreeViewBaseItem[] = [
  {
    id: "user-profile",
    label: "User Profile",
    children: [
      { id: "overview", label: "Overview" },
      { id: "projects", label: "Projects" },
      { id: "campaigns", label: "Campaigns" },
      { id: "documents", label: "Documents" },
      { id: "followers", label: "Followers" },
    ]
  },
  {
    id: "account",
    label: "Account",
    children: [
      { id: "settings", label: "Settings" },
      { id: "security", label: "Security" },
      { id: "billing", label: "Billing" },
    ]
  },
  {
    id: "corporate",
    label: "Corporate",
    children: [
      { id: "about", label: "About" },
      { id: "team", label: "Team" },
      { id: "careers", label: "Careers" },
    ]
  },
  {
    id: "blog",
    label: "Blog",
    children: [
      { id: "posts", label: "Posts" },
      { id: "authors", label: "Authors" },
      { id: "categories", label: "Categories" },
    ]
  },
  {
    id: "social",
    label: "Social",
    children: [
      { id: "feed", label: "Feed" },
      { id: "friends", label: "Friends" },
      { id: "messages", label: "Messages" },
    ]
  },
];
 

const routeToSidebarMapping: Record<string, string> = {
  '/ecommerce': 'ecommerce',
  '/default': 'default',
};

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [selectedItems, setSelectedItems] = useState('default');
  const [expandedItems, setExpandedItems] = useState(['user-profile']);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const mappedItem = routeToSidebarMapping[currentPath];
    
    if (mappedItem) {
      setSelectedItems(mappedItem);
      
      if (mappedItem === 'default' && !expandedItems.includes('ecommerce')) {
        setExpandedItems(prev => [...prev, 'ecommerce']);
      }
    }
  }, [location.pathname]);

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent | null,
    itemId: string | null
  ) => {
      
     
      setSelectedItems(itemId || '');
      if (itemId) {
        handleItemClick(itemId);
      }
      

  };

  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    navigate(itemId);
  };

  


  const handleItemExpansionToggle = (
    event: React.SyntheticEvent | null,
    itemId: string,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      setExpandedItems([...expandedItems, itemId]);
    } else {
      setExpandedItems(expandedItems.filter(item => item !== itemId));
    }
   
  };
  return (
    <Box
      sx={{
        width: 212,
        height: "100vh",
        bgcolor: "background.paper", 
        overflowY: "auto",
        display: "flex",
        borderRight: "1px solid",
        borderColor: "text.border",
        flexDirection: "column",
        padding :"16px",
        gap: "16px",
        
         
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" ,padding:"4px" ,gap:"8px"}}>
        <Avatar src={ByeWindImage} alt="Profile" sx={{ width: 24, height: 24 }} />
        <Typography variant="subtitle1" fontWeight="regular" sx={{ fontSize: '14px' }}>
          ByeWind
        </Typography>
      </Box>

      <Box sx={{  pb: "14px" ,display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Box sx={{display: 'flex', gap: '8px' }}>

          <Button
            variant="text"
            disableRipple
            onClick={() => setActiveTab('favorites')}
            sx={{
              color: activeTab === 'favorites' ? 'text.disabled' : 'text.disabledButton',
              fontSize: '14px',
              fontWeight: 400,
              minWidth: 'auto',
              paddingX: 1,
              paddingY: 0.5,
              borderRadius: '8px',
              '&:focus': {
                outline: 'none',
              },
              textTransform: 'capitalize',
            }}
          >
            Favorites
          </Button>
          <Button
            variant="text"
            disableRipple
            onClick={() => setActiveTab('recently')}
            sx={{
              color: activeTab === 'recently' ? 'text.disabled' : 'text.disabledButton',
              fontSize: '14px',
              fontWeight: 400,
              minWidth: 'auto',
              paddingX: 1,
              paddingY: 0.5,
              textTransform: 'capitalize',
              borderRadius: '8px',
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            Recently
          </Button>
        </Box>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <Box 
            sx={{ 
              paddingX:1,
              paddingY:0.5,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.disabled' }} />
            <Typography sx={{ fontSize: '14px' }}>Overview</Typography>
          </Box>

          <Box 
            sx={{ 
              paddingX:1,
              paddingY:0.5,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.disabled' }} />
            <Typography sx={{ fontSize: '14px' }}>Projects</Typography>
          </Box>
        </Box>

      </Box>

       

      <Box sx={{  pb:"14px"}}>
      <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'text.disabled',
            fontSize: '14px',
            fontWeight: 400,
            paddingLeft:1.5,
            mb: .5,
          }}
        >
          Dashboards
        </Typography>
        <RichTreeView
          items={DASHBOARD_ITEMS}
          expandedItems={expandedItems}  // Changed from defaultExpandedItems
          selectedItems={selectedItems}
          onItemExpansionToggle={handleItemExpansionToggle}
          onSelectedItemsChange={handleSelectedItemsChange}
          slots={{ item: CustomTreeItem as React.ComponentType<TreeItemProps> }}
          itemChildrenIndentation={24}
          sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
        />
      </Box>
      <Box sx={{  pb:"14px"}}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'text.disabled',
            fontSize: '14px',
            fontWeight: 400,
            paddingLeft:1.5,
            mb: .5,
          }}
        >
          Pages
        </Typography>
        <RichTreeView
          items={PAGES_ITEMS}
          expandedItems={expandedItems}
          selectedItems={selectedItems}
          onItemExpansionToggle={handleItemExpansionToggle}
          onSelectedItemsChange={handleSelectedItemsChange}
          slots={{ item: CustomTreeItem as React.ComponentType<TreeItemProps> }}
          itemChildrenIndentation={24}

          sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
        />
      </Box>
    </Box>
  );
}