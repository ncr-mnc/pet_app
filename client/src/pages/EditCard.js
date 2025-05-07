import BoardCard from "../components/BoardCard";
import ColorPicker from "../components/ColorPicker";
import SetCaption from "../components/SetCaption";
import SetTitle from "../components/SetTitle";
import TagsInput from "../components/TagsInput";
import UploadImage from "../components/UploadImage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Box, Stack, Button, Alert, Snackbar } from "@mui/material";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

function EditCard() {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const {id} = useParams();
    const {user} = useAuth();
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [likes, setLikes] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch(`/api/boards`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${user.token}`}
            })
            const data = await res.json();
            setBoards(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (boards && id) {
            const cardToEdit = boards.find(card => card._id.toString() === id);
            if (cardToEdit) {
                setTitle(cardToEdit.title || "");
                setBgColor(cardToEdit.bgColor || "#ffffff");
                setCaption(cardToEdit.caption || "");
                setImage(cardToEdit.image || null);
                setTags(cardToEdit.tags || []);
                setLikes(cardToEdit.likes || 0);
            }
        }
    }, [boards, id]);

    const handleCard = async() => {
        const updatedCard = {
            title,
            image,
            bgColor,
            caption,
            tags,
            likes,
            comments: boards.comments,
            _id: id,
            token: user.token
        };
        const res = await fetch(`/api/boards/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`},
            body: JSON.stringify(updatedCard)
        })
        const result = await res.json();

        if (res.ok) {
            setSnackbarMessage("Successfully edited!");
            setOpenSnackbar(true);
            navigate('/myCards')
        } else {
            setSnackbarMessage("Error editing card");
            setOpenSnackbar(true);
        }

    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };

    const handleImage = (imgUrl) => setImage(imgUrl);

    return (
        <Container maxWidth="lg" sx={{ display: "flex", gap: 3, mt: 4 }}>
            <Box sx={{ flex: 1, maxWidth: 400 }}>
                <Stack direction="column" spacing={2} >
                    <SetTitle onChange={setTitle}/>
                    <SetCaption onChange={setCaption}/>
                    <TagsInput tags={tags} onChange={setTags}/>
                    <UploadImage value={image} onChange={handleImage}/>
                    <ColorPicker value={bgColor} onChange={setBgColor}/>
                    <Button
                    variant='contained'  
                    onClick={handleCard}>Save My Edited Card
                    </Button> 
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Stack 
                direction="column" 
                sx={{ml: 4}}>
                    <BoardCard cards={{title, caption, tags, image, likes }} bgColor={bgColor} tags={tags}/>
                </Stack>
            </Box> 
        </Container>
    )
}
export default EditCard;
