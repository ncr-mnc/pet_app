import { Card, CardContent, Typography, CardMedia, Chip, Stack } from "@mui/material"

function BoardCard({cards, bgColor, tags}) {
    return ( 
        <Card 
        sx={{
            backgroundColor: bgColor || "#fff",
            color: "#fff",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 5,
            height: 400,
            width: 300,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}>
            <CardContent sx={{paddingTop: '8px', paddingBottom: '8px'}}> 
                <Typography 
                variant="h6"
                component="h2"
                sx={{ fontWeight: 600 }}>{cards.title}</Typography>
            </CardContent>
            <CardContent direction="row" sx={{
            display: 'flex',
            justifyContent: 'center',
            height: "60%",
            paddingTop: '8px',
            paddingBottom: '8px'
            }}>
                <CardMedia 
                component="img"
                image={cards.image}
                alt={cards.title}
                sx={{
                    height: "auto", 
                    objectFit: "contain",
                    width: "250px",
                    marginBottom: '8px'
                }}/> 
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {tags.map((tag, index) => (
                        <Chip key={index} label={tag}></Chip>
                    ))}
                </Stack>
            </CardContent>
            <CardContent>
                <Typography variant="body2" sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3, 
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
                }}>{cards.caption}</Typography>
            </CardContent>
        </Card>
    )
}

export default BoardCard;