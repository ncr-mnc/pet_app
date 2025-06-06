import BoardCard from "../components/BoardCard";
import { Stack, Button, Box, Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import UploadImage from "../components/UploadImage";
import ColorPicker from "../components/ColorPicker";
import SetCaption from "../components/SetCaption";
import SetTitle from "../components/SetTitle";
import TagsInput from "../components/TagsInput";


function CreateCard() {
    const [cards, setCards] = useState({});
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [bgColor, setBgColor] = useState("#0c0d0d");
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState([]);
    const [boards, setBoards] = useState([]);
    const {user} = useAuth();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackColor, setSnackColor] = useState('success');
    const createBoard = async (boardData) => {
        const res = await fetch(`/api/boards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(boardData)
        });
        const data = await res.json();
        return data;
    }
    const handleCard = async (e) => {
        e.preventDefault();

        const newCard = {
            title,
            image: image || '',
            bgColor,
            caption,
            tags,
            token: user.token
        }
        setCards(newCard);
        setTitle("");
        setImage(null);
        setBgColor("#0c0d0d");
        setCaption("");
        setTags([]);

        const newBoard = await createBoard(newCard);
        if (!newBoard.title) {
            setSnackbarMessage('Failed to create!');
            setSnackColor('error');
            setOpenSnackbar(true);
            return;
        }
        setBoards([...boards, newBoard]);
        const isSuccess = true;
        if (newBoard) {
          setSnackbarMessage('Successfully created!');
          setOpenSnackbar(true);
          setSnackColor('success');
        }
    }

    const handleImage = (imgUrl) => setImage(imgUrl);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };
    return (
        <Box maxWidth="lg" sx={{ display: "flex", gap: 3, mt: 4, alignItems: 'center', justifyContent: 'space-around', flexDirection: {  
            xs: 'column',  
            sm: 'row',   
            md: 'row', } }}>
            <Box sx={{ flex: 1, maxWidth: 400 }}>
                <Stack direction="column" spacing={2} >
                    <SetTitle onChange={setTitle}/>
                    <SetCaption onChange={setCaption}/>
                    <TagsInput tags={tags} onChange={setTags}/>
                    <UploadImage value={image} onChange={handleImage}/>
                    <ColorPicker value={bgColor} onChange={setBgColor}/>
                    <Button
                    variant='contained'  
                    onClick={handleCard}>Save My Card
                    </Button> 
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                        {snackbarMessage}
                        </Alert>
                    </Snackbar>                   
                </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Stack 
                direction="column" 
                sx={{ml: 4}}>
                    <BoardCard cards={cards} bgColor={bgColor} tags={tags}/>
                </Stack>
            </Box> 
        </Box>
    )
}
export default CreateCard;