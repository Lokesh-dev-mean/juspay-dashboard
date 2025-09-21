import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
// Import all avatar images
import Avatar3D03 from '../../../assets/images/3D03.png';
import Avatar3D05 from '../../../assets/images/3D05.png';
import Avatar3D08 from '../../../assets/images/3D08.png';
import AvatarFemale05 from '../../../assets/images/Female05.png';
import AvatarMale06 from '../../../assets/images/Male06.png';
import AvatarMale07 from '../../../assets/images/Male07.png';
import AvatarMale08 from '../../../assets/images/Male08.png';
import AvatarMale11 from '../../../assets/images/Male11.png';
// Import icons for notifications
import BugIcon from '../../../assets/icons/BugBeetle.svg';
import UserIcon from '../../../assets/icons/User.svg';
import BroadcastChannelIcon from '../../../assets/icons/Broadcast.svg';



// Custom styled components
const CustomStepper = styled(Stepper)({
  '.MuiStepConnector-line': {
    minHeight: '14px',
    borderLeftWidth: '2px',
    position: 'absolute',
    top: '-9px',
       },
  '.MuiStepConnector-root': {
    marginLeft: '14.5px',
    position: 'relative',
    padding: 0,
    minHeight: '10px' // Adjust this value based on your spacing needs
  },
  '.MuiStep-root': {
    padding: 0,
    position: 'relative'
  },
  '.css-lxm8ab-MuiStepLabel-root': {
    padding: '4px',
    alignItems: 'start',
  }
});

const ActivityStep = styled(Step)({
  display: 'flex',
  alignItems: 'flex-start',
});

const ActivityLabel = styled(StepLabel)({
  '.MuiStepLabel-iconContainer': {
    padding: 0,
  },
  '.MuiStepLabel-labelContainer': {
    marginLeft: '12px',
  }
});

// Activity data interface
interface Activity {
  avatar: string;
  title: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    avatar: Avatar3D05 ,
    title: 'You have a bug that needs...',
    timestamp: 'Just now'
  },
  {
    avatar: AvatarFemale05,
    title: 'Released a new version',
    timestamp: '59 minutes ago'
  },
  {
    avatar: Avatar3D08 ,
    title: 'Submitted a bug',
    timestamp: '12 hours ago'
  },
  {
    avatar: AvatarMale07,
    title: 'Modified A data in Page X',
    timestamp: 'Today, 11:59 AM'
  },
  {
    avatar: AvatarMale11,
    title: 'Deleted a page in Project X',
    timestamp: 'Feb 2, 2023'
  }
];

// Add contacts interface
interface Contact {
  avatar: string;
  name: string;
}

const contacts: Contact[] = [
  {
    avatar: AvatarFemale05,
    name: 'Natali Craig'
  },
  {
    avatar: Avatar3D03,
    name: 'Drew Cano'
  },
  {
    avatar: AvatarMale06,
    name: 'Orlando Diggs'
  },
  {
    avatar: AvatarMale07,
    name: 'Andi Lane'
  },
  {
    avatar: AvatarMale08,
    name: 'Kate Morrison'
  },
  {
    avatar: AvatarMale11,
    name: 'Koray Okumus'
  }
];

// Add notifications interface
interface Notification {
  icon: string;
  type: 'bug' | 'user' | 'bell';
  message: string;
  timestamp: string;
  bgColor?: string;
}

const notifications: Notification[] = [
  {
    icon: BugIcon,
    type: 'bug',
    message: 'You have a bug that needs...',
    timestamp: 'Just now',
  },
  {
    icon: UserIcon,
    type: 'user',
    message: 'New user registered',
    timestamp: '59 minutes ago',
  },
  {
    icon: BugIcon,
    type: 'bug',
    message: 'You have a bug that needs...',
    timestamp: '12 hours ago',
  },
  {
    icon: BroadcastChannelIcon,
    type: 'bell',
    message: 'Andi Lane subscribed to you',
    timestamp: 'Today, 11:59 AM',
  }
];

export const RightSidebar: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      width: 280,
      height: "100vh",
      bgcolor: "background.paper", 
      overflowY: "auto",
      display: "flex",
      borderLeft: "1px solid",
      borderColor: "text.border",
      flexDirection: "column",
      padding: "16px",
      gap: "24px",
       
    }}>
      
      {/* Notifications Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="h5" sx={{ 
          paddingX: '4px',
          fontFamily: 'Inter',
          paddingY: '8px',
          fontWeight: 600,
          fontSize: '14px',
          height: '36px'
        }}>
          Notifications
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {notifications.map((notification, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '4px',
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'background.input'
                }
              }}
            >
              <Box
                sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.icon'
                }}
              >
                <img 
                  src={notification.icon} 
                  alt={notification.type}
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    
                  }} 
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'text.primary',
                    lineHeight: '20px'
                  }}
                >
                  {notification.message}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'text.secondary',
                    lineHeight: '18px'
                  }}
                >
                  {notification.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Activities Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="h5" sx={{ 
          paddingX: '4px',
          fontFamily: 'Inter',
          paddingY: '8px',
          fontWeight: 600,
          fontSize: '14px',
          height: '36px'
        }}>
          Activities
        </Typography>
        
        <CustomStepper orientation="vertical" activeStep={-1}>
          {activities.map((activity, index) => (
            <ActivityStep key={index}>
              <ActivityLabel 
                
                icon={
                  <Avatar 
                    src={activity.avatar} 
                    sx={{ 
                      width: 24, 
                      height: 24,
                      
                    }}
                  />
                }
              >
                <Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 400,
                      color: 'text.primary',
                      fontSize: '14px',
                      lineHeight: '20px'
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '18px', 
                    }}
                  >
                    {activity.timestamp}
                  </Typography>
                </Box>
              </ActivityLabel>
            </ActivityStep>
          ))}
        </CustomStepper>
      </Box>

      {/* Contacts Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
       
        <Typography variant="h5" sx={{ 
          paddingX: '4px',
          fontFamily: 'Inter',
          paddingY: '8px',
          fontWeight: 600,
          fontSize: '14px',
          height: '36px'
        }}>
          Contacts
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {contacts.map((contact, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px',
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'background.input'
                }
              }}
            >
              <Avatar
                src={contact.avatar}
                sx={{
                  width: 24,
                  height: 24
                }}
              />
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'text.primary',
                  fontFamily: 'Inter'
                }}
              >
                {contact.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
