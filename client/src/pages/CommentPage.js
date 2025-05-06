import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import BoardCard from "../components/BoardCard";
import DeleteIcon from '@mui/icons-material/Delete';

function CommentPage() {
    const {id} = useParams();
    const {user} = useAuth();
    const [comment, setComment] = useState('');
    const [board, setBoard] = useState({});
    const [boardComments, setBoardComments] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch('http://localhost:5000/api/boards', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            if(res.ok){
            const data = await res.json();
            const current = await data.find(el => el._id.toString() === id);
            setBoard(current);
            setBoardComments(Array.isArray(current.comments) ? current.comments : []);
            }
        }
        fetchData();
        if(!user.token) {
            setBoard({});
            setBoardComments([]);
        };
    }, [id, user.token]);
    
    console.log("log comments in useeffect", boardComments);
    console.log('log board in useeffect: ', board);
    console.log('board comment: ', boardComments)
    const handleComment = async() => {
        const updatedComments = [...boardComments, comment];
        const updated = ({
            title: board.title,
            caption: board.caption,
            tags: board.tags,
            image: board.image,
            bgColor: board.bgColor,
            likes: board.likes,
            comments: updatedComments,
            _id: id,
            token: user.token
        })

        const res = await fetch(`http://localhost:5000/api/boards/comments/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(updated)
        })
        const result = await res.json();
        setBoard(result);
        setComment('');
        setBoardComments(updatedComments);
    }

    const handleDelete = async(index) => {
        const updatedComments = boardComments.filter((el) => el !== boardComments[index]);
        const updated = ({
            title: board.title,
            caption: board.caption,
            tags: board.tags,
            image: board.image,
            bgColor: board.bgColor,
            likes: board.likes,
            comments: updatedComments,
            _id: id,
            token: user.token
        });
        const res = await fetch(`http://localhost:5000/api/boards/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(updated)
        });
        const result = await res.json();
        setBoard(result);
        setBoardComments(updatedComments);
    }

    return(
        <Box sx={{
            margin: '16px', 
            display: 'flex', 
            justifyContent: 'center', 
            flexDirection: 'column', 
            alignItems: 'center'}}>
            {board.title && <BoardCard cards={{title: board.title, caption: board.caption, tags: board.tags, image: board.image, likes: board.likes}} bgColor={board.bgColor} tags={board.tags}/>}
            <Stack 
            direction='column' 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                width: {xs: '90%', sm: '80%', md: '60%'}}}
            >
                {boardComments.length > 0 && boardComments.map((el, index) => (
                    <Stack key={index} sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        flexDirection: {xs: 'column', sm: 'row', md: 'row'},
                        alignItems: 'center',
                        width: '100%'}}>
                        <Typography minWidth='90%'
                        sx={{
                            padding: '8px', 
                            border: '2px', 
                            borderRadius: '16px', 
                            backgroundColor: '#434545', 
                            wordBreak: "break-word",
                            margin: '8px'}}
                            >{el}</Typography>    
                        <Button onClick={() => handleDelete(index)}><DeleteIcon/></Button>
                    </Stack>
                ))}
            </Stack>
            <TextField value={comment} onChange={(e) => setComment(e.target.value)} sx={{width: '55%'}}></TextField>
            <Button onClick={handleComment}>submit</Button>
        </Box>
    )
}

export default CommentPage;