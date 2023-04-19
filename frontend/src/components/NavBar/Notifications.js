import * as React from 'react';
import react ,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {setNotifications} from "../redux/reducers/posts"
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const[notification,setNotification]=useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  //useDispatch
  const dispatch = useDispatch();

  //redux login states
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/notification`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) =>{
        console.log(response.data.result);
        setNotification(response.data.result)
        dispatch(setNotifications(response.data.result))
      })
      .catch(function (error) {
        throw error;
      });
  }, []);
  return (
    <React.Fragment>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
</svg></Avatar>
        </IconButton>
      </Tooltip>
    </Box>
 
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
         {notification && notification.map((elem,i)=>{
        <MenuItem onClick={handleClose} key={i}>
        <Avatar /> {elem.content}
      </MenuItem>
    })}
      
     
    
      
    </Menu>
    
  </React.Fragment>
  );
}