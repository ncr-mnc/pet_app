import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { useAuth } from '../Hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';

function MainPage() {
    const {user} = useAuth();
    const typographyStyle = {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: '8px'
    }
    return(
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '32px'}}>
            {user.isAuthenticated && <Typography variant='h4'>Hellloooooooo, {user.username} <br></br> Start creating your plans!</Typography>}
            {!user.isAuthenticated &&<Typography variant='h4'>Here you can create plans, but first register or sign in, please</Typography>}
            <Stack sx={{marginTop: '32px',display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}> 
                <Typography>Here you can create your plans, leave comments for notes, a brief overview: </Typography>
                <Typography sx={typographyStyle}> <EditIcon sx={{marginRight: '8px'}}/> Edit plan </Typography>
                <Typography sx={typographyStyle}><AddCommentIcon sx={{marginRight: '8px'}}/>Leave comments-notes </Typography>
                <Typography sx={typographyStyle}><DeleteIcon sx={{marginRight: '8px'}}/> Delete </Typography>
                <Typography sx={typographyStyle}><FactCheckIcon sx={{marginRight: '8px'}}/> Mark the number of days when you paid attention to the planned </Typography>
                <Typography sx={typographyStyle}><ArrowCircleDownIcon sx={{marginRight: '8px'}}/> Download the description card </Typography>
            </Stack>
            <Typography variant='h5' sx={{marginTop: '32px'}}> Have a nice day! </Typography>
        </Container>
    )
}

export default MainPage;