import { Container, Grid} from "@mui/material";
import { useAuth } from "../Hooks/useAuth";
import CardWrapper from "../components/CardWrapper";
import { useEffect, useState } from "react";

function MyCards() {
    const [boards, setBoards] = useState([]);
    const {user} = useAuth();
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
        }
        fetchData();
    }, [user?.token]);

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
    }
    const handleDeleteCard = async(id) => {
        const confirm = window.confirm("Do you wanna delete card?");
        if (confirm) {
        const newBoards = await deleteBoard(id);
        setBoards(newBoards);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ display: "flex", gap: 3, mt: 4 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {boards.length > 0 && boards.map((card) => (
            card && card.title ?
            (<Grid
                key={card._id} 
                xs={12} sm={6} md={4}>
                    <CardWrapper card={card} onDelete={handleDeleteCard}/>
                </Grid>
            ) : null
        ))} 
            </Grid>
        </Container>
    );
}
export default MyCards;