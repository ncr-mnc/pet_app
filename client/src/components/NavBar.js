import '../App.css';
import {ButtonGroup, Button, Typography,  Box} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

function NavBar() {
    const {user, logout} = useAuth();
    console.log("token in navbar: ", user);
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#b2a5e8",
                padding: "10px 20px",
                width: "100%",
                height: "70px",
            }}
            >
            {user.isAuthenticated && <div className='pageList'>
                <ButtonGroup sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button 
                    variant='contained' 
                    sx={{marginRight: "5px"}}
                    component={NavLink}
                    to="/createBoard"
                    >Create Board</Button>
                    <Button 
                    variant='contained' 
                    sx={{marginRight: "5px"}}
                    component={NavLink}
                    to="/myCards"
                    >My Cards</Button>
                </ButtonGroup>
            </div>}
                <Typography variant='h4' component={NavLink} to="/" sx={{
                    margin: '20px',
                    color: "#8332a8",
                }}>Welcome to MoodBoard:)
                </Typography>
            {!user.isAuthenticated && <div className='sign'>
                <ButtonGroup 
                    sx={{display: "flex", 
                    justifyContent: "flex-end"}}
                    >
                    <Button 
                    variant='contained' 
                    component={NavLink}
                    to="/signIn"
                    sx={{
                        marginRight: "5px",
                    }}>Sign In
                    </Button>
                    <Button 
                    variant='contained' 
                    component={NavLink} 
                    to="/signUp"
                    sx={{
                        marginLeft: "5px"
                    }}
                    >Sign Up
                    </Button>
                </ButtonGroup>
            </div>}
            {user.isAuthenticated &&  <Button
            variant='contained'
            onClick={logout}> Log Out</Button>}
        </Box>
    )
}
export default NavBar;