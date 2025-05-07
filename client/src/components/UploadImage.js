import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const  UploadImage = ({value, onChange}) => {
    const handleImageComp = async (e) => {
        const file = e.target.files?.[0];
            if(!file) return;
            const formData = new FormData();
            formData.append('image', file);
            try{
            const res = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log('data from upload: ', data);
            if (res.ok) {
                onChange(data.imageUrl);
            } else {
                console.error('error uploading image:', data.message);
        }} catch (err) {
            console.error('error uploading image:', err.message);
        };
    };
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
              style={{ marginTop: "8px", width: '50%', borderRadius: "8px" }}
            />
        )}
        </>
    )
}
export default UploadImage;