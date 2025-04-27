import { TextField } from "@mui/material";

function SetCaption({ onChange}) {
    return (
        <TextField
        label="Caption"
        multiline
        variant="outlined" 
        maxRows={4}
        size="small"
        onChange={(e) => onChange(e.target.value)}
        sx={{
            color: "#8332a8",
            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#8332a8", 
            },}
        }}
        />
    );
};
export default SetCaption;