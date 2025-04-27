import { Stack, Button } from "@mui/material";
import BoardCard from "./BoardCard";
import { useRef } from "react";
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function CardWrapper({card, onDelete}) {
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
            <Stack direction="row" sx={{justifyContent: "center"}}>
                <Button
                variant='contained'
                size="small"
                sx={{marginLeft: "8px", backgroundColor: card.bgColor}}
                component={NavLink}
                to={`/edit/${card._id}`}
                endIcon={<EditIcon/>}>Edit Card</Button>
                <Button 
                variant='contained'
                size="small"  
                onClick={handleDownload} 
                sx={{backgroundColor: card.bgColor}}
                endIcon={<ArrowCircleDownIcon/>}>Download</Button>
                <Button 
                variant='contained'
                size="small"  
                sx={{backgroundColor: card.bgColor}}
                onClick={() => onDelete(card._id)} 
                endIcon={<DeleteIcon/>}>Delete Card</Button>
            </Stack>
        </Stack>
    )
}
export default CardWrapper;