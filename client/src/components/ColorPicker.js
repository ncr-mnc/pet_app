import { TextField } from "@mui/material";

function ColorPicker({value, onChange}) {
    return (
        <TextField
        type="color"
        id="outlined-basic"
        label="Card background"
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ 
            width: "150px", 
            margin: "16px 0" ,
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: "#8332a8", 
            },}
        }}
        /> 
    );
}
export default ColorPicker;