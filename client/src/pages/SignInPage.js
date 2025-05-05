import {Button, Stack, TextField, Typography} from "@mui/material";
import { useAuth } from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SingIN() {
    const {user, setUser} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem('userId') || '';
    console.log("token in signin: ", user.token);
    useEffect(() => {
        if (!userId) return;
        const fetchData = async() => {
            const res = await fetch(`http://localhost:5000/api/getUser/${userId}`, {
                method: "GET",
                headers: {"Content-Type": "application/json",
                },
            })
            if(!res.ok) {
                const errorText = await res.text();
                console.error('Fetch failed: ', res.status, errorText);
                return;
            }
            const data = await res.json();
            setUser({
                isAuthenticated: true,
                username: data.username,
                token: localStorage.getItem('token')
            });
        }
        fetchData();
    }, [userId]);
    console.log("user in sign in: ", user)
    const singnIn = async(checkUser) => {
        const res = await fetch("http://localhost:5000/api/signIn", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(checkUser)
        })
        const data = await res.json();
       if(res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        setMessage("Success!")
        navigate('/');
       } else {
        setMessage("Wrong data, try again or sign up first");
       }
    }
    const handleSignIn = async (e) => {
        e.preventDefault();
        const userToCheck = {
            username,
            password
        }
        await singnIn(userToCheck);
    };

    return(
        <Stack
        sx={{
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
                Sign In, please
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
            onClick={handleSignIn}
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

export default SingIN;