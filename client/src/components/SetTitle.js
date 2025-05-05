import { TextField } from "@mui/material";

function SetTitle({onChange}) {
    return (
        <TextField 
        id="outlined-basic" 
        required
        label="Enter title" 
        variant="outlined" 
        size="small"
        onChange={(e) => onChange(e.target.value)}
        />
    );
};
export default SetTitle;