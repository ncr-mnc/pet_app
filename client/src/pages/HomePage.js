import React from 'react';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../Hooks/useAuth';

function MainPage() {
    const {user} = useAuth();
    return(
        <Container>
            {user.isAuthenticated && <Typography variant='h2'>Hellloooooooo, {user.username} <br></br> Start creating your cards!</Typography>}
            {!user.isAuthenticated &&<Typography variant='h2'>Here you can create your simple cards, but first register, please</Typography>}
        </Container>
    )
}

export default MainPage;