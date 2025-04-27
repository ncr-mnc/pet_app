import { TextField } from "@mui/material";

function SetTitle({onChange}) {
    return (
        <TextField 
        id="outlined-basic" 
        required
        label="Enter title" 
        variant="outlined" 
        size="small"
        sx={{color: "#8332a8",
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#8332a8', 
            },}
        }}  
        onChange={(e) => onChange(e.target.value)}
        />
    );
};
export default SetTitle;