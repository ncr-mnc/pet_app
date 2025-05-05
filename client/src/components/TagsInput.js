import { Button, Chip, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

function TagsInput({tags, onChange}) {
    const [input, setInput] = useState("");
    const handleAdd = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
            setInput("");
        }
    }
    const handleDeleteTag = (tag) => {
        onChange(tags.filter((el) => el !== tag));
    }
    return (
        <div>
            <TextField
            id="outlined-basic" 
            label="Enter tag" 
            variant="outlined" 
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <Button 
            onClick={handleAdd}
            > Add tag
                <AddIcon/>
            </Button>
            <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {tags.map((tag, index) => (
                    <Chip 
                    key={index} 
                    label={tag} 
                    onDelete={() => handleDeleteTag(tag)}
                    color="primary"></Chip>
                ))}
            </div>
        </div>

    );
};
export default TagsInput;