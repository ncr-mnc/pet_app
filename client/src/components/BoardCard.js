import { Card, CardContent, Typography, CardMedia, Chip, Stack } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';

function BoardCard({cards, bgColor, tags}) {
    return ( 
        <Card 
        sx={{
            backgroundColor: bgColor || "#fff",
            color: "#fff",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: '0 16px 12px rgba(0,0,0,0.25)',
            height: 400,
            width: 300,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}>
            <CardContent sx={{paddingTop: '8px', paddingBottom: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                <Typography 
                variant="h6"
                component="h2"
                sx={{ fontWeight: 600 }}>{cards.title}
                </Typography>
                <Typography> <FavoriteIcon sx={{color: '#cf382d'}}/>{cards.likes}</Typography>
            </CardContent>
            <CardContent direction="row" sx={{
            display: 'flex',
            justifyContent: 'center',
            height: "60%",
            paddingTop: '8px',
            paddingBottom: '0px'
            }}>
                <CardMedia 
                component="img"
                image={cards.image}
                alt={cards.title}
                sx={{
                    height: "auto", 
                    objectFit: "contain",
                    width: "80%",
                    borderRadius: '16px',
                    paddingBottom: '0px'
                }}/> 
            </CardContent>
            <Stack direction="row" spacing={1}  sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: '5px'}}>
                    {tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" sx={{color: '#fcffff', fontSize: '12px'}}></Chip>
                    ))}
                </Stack>
            <CardContent sx={{marginTop: '0px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px'}}>
                <Typography variant="body2" sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3, 
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
                marginBottom: '16px',
                marginTop: '0px'
                }}>{cards.caption}</Typography>
            </CardContent>
        </Card>
    )
}

export default BoardCard;