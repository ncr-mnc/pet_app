import { Stack, Button } from "@mui/material";
import BoardCard from "./BoardCard";
import { useRef } from "react";
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';

function CardWrapper({card, onDelete, onLike}) {
    const cardRef = useRef();
    const handleDownload = () => {
        if (!cardRef.current) return;
        toPng(cardRef.current).then((dataUrl) => {
            download(dataUrl, `${card.title || "my-card"}.png`);
        });
    };
    return (
        <Stack spacing={1}>
            <div ref={cardRef}>
                <BoardCard key={card._id} cards={card} bgColor={card.bgColor} tags={card.tags} />
            </div>
            <Stack direction="row" sx={{justifyContent: "space-around", width: 300, display: 'flex', flexWrap: 'wrap'}}>
                <Button
                variant='contained'
                size="small"
                component={NavLink}
                to={`/edit/${card._id}`}
                ><EditIcon/></Button>
                <Button
                variant='contained'
                size="small"
                component={NavLink}
                to={`/comment/${card._id}`}                
                ><AddCommentIcon/></Button>
                <Button 
                variant='contained'
                size="small"  
                onClick={handleDownload} 
                ><ArrowCircleDownIcon/></Button>
                <Button 
                variant='contained'
                size="small"  
                onClick={() => onDelete(card._id)} 
                ><DeleteIcon/></Button>
                <Button 
                variant='contained'
                size="small"  
                sx={{ marginTop: '8px'}}
                onClick={() => onLike(card._id, card.likes)}><FavoriteIcon/></Button>
            </Stack>
        </Stack>
    )
}
export default CardWrapper;