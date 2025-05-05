import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    palette: {
        background: {
            default: "#be6bf2", // фон для <body>
            paper: "#f2cc6b",   // фон для компонентів (наприклад, <Paper>)
        },
        primary: {
            main: '#0c0d0d',
        },
        secondary: {
            main: '#ff4081',
        },
        },
        typography: {
        fontFamily: 'Arial',
        h4: {
            fontWeight: 700,
        },
        allVariants: {
            color: 'white', // Set all text to white
        },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        textTransform: 'none',
                        opacity: ".8",
                        color: 'white',
                        width: {
                        xs: "100px",   // для екранів <600px
                        sm: "150px",   // від 600px
                        md: "200px",   // від 900px
                        lg: "250px",   // від 1200px
                        }
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#434545',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#474747', 
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#434545', 
                        },
                        color: 'white',
                    },
                },
            },
        },
    });

  export default myTheme;
  