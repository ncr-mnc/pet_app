import { Button, Container, Grid, Stack, Typography} from "@mui/material";
import { useAuth } from "../Hooks/useAuth";
import CardWrapper from "../components/CardWrapper";
import { useEffect, useState } from "react";

function MyCards() {
    const [boards, setBoards] = useState([]);
    const {user} = useAuth();
    const [tags, setTags] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeTag, setActiveTag] = useState('');

    useEffect(() => {
        if(!user || !user.token) {
            setBoards([]);
            return;
        }
        const fetchData = async() => {
            const res = await fetch("http://localhost:5000/api/boards", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Fetch failed:", res.status, errorText);
                return;
            }
            const data = await res.json();
            setBoards(Array.isArray(data) ? data : []);
            const uniqueTags = new Set(data.flatMap((board) => board.tags || []));
            setTags(Array.from(uniqueTags));
            setFiltered(Array.isArray(data) ? data : [])
        }
        fetchData();
    }, [user?.token]);

    const handleFilter = (tag) => {
        const filteredCards = boards.filter((card) => card.tags && card.tags.includes(tag));
        setFiltered(filteredCards);
        setActiveTag(tag);
    };

    const deleteBoard = async(id) => {
        console.log(`http://localhost:5000/api/boards/${id}`);
        const res = await fetch(`http://localhost:5000/api/boards/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const data = await res.json();
        return data;
    };
    
    const handleDeleteCard = async(id) => {
        const confirm = window.confirm("Do you wanna delete card?");
        if (confirm) {
        const newBoards = await deleteBoard(id);
        setBoards(newBoards);
        };
    };

    useEffect(() => {
        const uniqueTags = new Set(boards.flatMap((board) => board.tags || []));
        setTags(Array.from(uniqueTags));
        setFiltered(Array.isArray(boards) ? boards : []);
        setActiveTag('All boards');
    }, [boards]);

    const likeBoard = async(id, newLikes) => {
        const res = await fetch(`http://localhost:5000/api/boards/likes/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({newLikes})
        })
        const data = await res.json();
        return data;
    }
    const handleLike = async(id, likes) => {
        const newLikes = likes + 1;
        const newBoards = await likeBoard(id, newLikes);
        setBoards(newBoards);
    }
    return (
        <Container maxWidth="lg" sx={{ display: "flex", gap: 3, mt: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Stack direction='row ' sx={{border: '3px', borderColor: 'white', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h6' sx={{marginRight: '8px'}}> Filter by tag: </Typography>
                {tags.length > 0 && tags.map((tag) => (
                    <Button key={tag} onClick={() => handleFilter(tag)} sx={{margin: '6px', backgroundColor: activeTag === tag ? '#595857' : 'black'}}>{tag}</Button>
                ))}
                <Button onClick={() => {setFiltered(boards); setActiveTag('All boards')}} sx={{ backgroundColor: activeTag === 'All boards' ? '#595857' : 'black'}}>All cards</Button>
            </Stack>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {filtered.length > 0 && filtered.map((card) => (
            card && card.title ?
                (<Grid
                key={card._id} 
                xs={12} sm={6} md={4}>
                    <CardWrapper card={card} onDelete={handleDeleteCard} onLike={handleLike} />
                </Grid>
            ) : null
            ))} 
            </Grid>
        </Container>
    );
}
export default MyCards;