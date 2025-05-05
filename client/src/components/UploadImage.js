import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function UploadImage({value, onChange}) {
    const handleImageComp = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            onChange(imageURL);
        }
    }
    return (
        <>
        <Button
        variant="text"
        startIcon={<FileUploadIcon/>}
        component="label"
        sx={{
            backgroundColor: '#141414'
        }}
        >
            Upload Image
            <input hidden type="file" onChange={handleImageComp} />
        </Button>
        {value && (
            <img
              src={value}
              alt="Preview"
              style={{ marginTop: "8px", maxWidth: "100%", borderRadius: "8px" }}
            />
        )}
        </>
    )
}
export default UploadImage;