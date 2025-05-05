import '../App.css';
import {ButtonGroup, Button, Typography,  Box, AppBar, Menu, MenuItem, IconButton} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
    const {user, logout} = useAuth();
    console.log("token in navbar: ", user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    return (
        <AppBar position='static' sx={{height: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white'}}>
            <Box sx={{ padding: '8px 2% 8px 2%', display: 'flex', flexDirection: 'row', color: 'white'}}>
                <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ width: '100px', fontSize: '1.5em', color: 'white'}}                
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{width: '100%',
                    '& .MuiPaper-root': { // Стилізуємо контейнер меню (MuiPaper)
                        backgroundColor: '#0c0d0d'
                    },
                    color: 'white'
                }}
                >
                    {user.isAuthenticated && <MenuItem component={NavLink} to="/createBoard">Create card</MenuItem>}
                    {user.isAuthenticated && <MenuItem  component={NavLink} to="/myCards">My card</MenuItem>}
                    {!user.isAuthenticated && <MenuItem  component={NavLink} to="/">Home page</MenuItem>}
                </Menu>
            </Box>
            <Typography 
                component={NavLink} to="/" sx={{
                    fontSize: {
                        xs: '1.25rem',  // ~h6
                        sm: '1.5rem',   // ~h5
                        md: '1.7rem'      // ~h4
                    },
                    fontWeight: 600,
                    marginTop: '0.5%',
                    color: 'white'
                }}>Welcome:)
                </Typography>
            <ButtonGroup 
                    sx={{display: "flex", 
                    justifyContent: "flex-end",
                    padding: '8px 2% 8px 2%',
                    
                }}
                    >
                    {!user.isAuthenticated && <Button 
                    variant='contained' 
                    size="small"
                    component={NavLink}
                    to="/signIn">Sign In
                    </Button>}
                    {!user.isAuthenticated && <Button 
                    variant='contained' 
                    size="small"
                    component={NavLink} 
                    to="/signUp"
                    >Sign Up
                    </Button>}
                    {user.isAuthenticated &&  <Button
                    size="small"
                    variant='contained'
                    onClick={logout}
                    component={NavLink}
                    
                    to='signIn'
                    > Log Out</Button>}
                </ButtonGroup>
        </AppBar>
    )
}
export default NavBar;