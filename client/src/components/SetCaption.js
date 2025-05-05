import { TextField } from "@mui/material";

function SetCaption({ onChange}) {
    return (
        <TextField
        label="Caption (200 symbols max)"
        multiline
        variant="outlined" 
        maxRows={4}
        size="small"
        onChange={(e) => onChange(e.target.value)}
        inputProps={{
            maxLength: 200,
          }}
        sx={{
            color: "#8332a8",
        }}
        />
    );
};
export default SetCaption;