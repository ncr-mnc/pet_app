import {Button, Stack, TextField, Typography} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() { 
    const navigate = useNavigate();
    const {setUser} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const signUp = async (newUser) => {
        const res = await fetch("http://localhost:5000/api/signUp", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newUser)
        });
        const data = await res.json();
        if(res.ok) {
            localStorage.setItem('token', data.token);
            navigate('/');
            setUser({...newUser, token: data.token, isAuthenticated: true}); 
            setMessage('');
        } else {
            setMessage('User already exist or fields not filled');
        }
    }
    const handleUser = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password
        };
        await signUp(newUser);
    };

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '32px',
            height: '60%',
            width: '300px'
            
        }}>
            <Typography
            variant="h4">
                Sign Up, please
            </Typography>
            <TextField
            id="outlined-basic" 
            required
            label="Enter username" 
            variant="outlined" 
            size="small"
            sx={{
                marginTop: '16px'
            }} 
            onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <TextField
            id="outlined-basic" 
            required
            label="Enter password" 
            variant="outlined" 
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
                marginTop: '16px'
            }}
            >
            </TextField>
            <Button
            onClick={handleUser}
            component={NavLink}
            to="/"
            variant='contained' 
            sx={{
                marginTop: "16px",
                width: "70%"
            }}
            >Submit</Button>
            <Typography
            sx={{
                color: 'red',
                marginTop: '16px'
            }}
            >{message}</Typography>
        </Stack>
    )
}
export default SignUp;