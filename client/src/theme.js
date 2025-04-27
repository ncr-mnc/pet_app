import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    palette: {
        background: {
            default: "#be6bf2", // фон для <body>
            paper: "#f2cc6b",   // фон для компонентів (наприклад, <Paper>)
        },
        primary: {
            main: '#8332a8',
        },
        secondary: {
            main: '#ff4081',
        },
        },
        typography: {
        fontFamily: 'Arial',
        h4: {
            fontWeight: 700,
        }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        textTransform: 'none',
                        opacity: ".8",
                        width: {
                        xs: "100px",   // для екранів <600px
                        sm: "150px",   // від 600px
                        md: "200px",   // від 900px
                        lg: "250px",   // від 1200px
                        },
                    },
                },
            },
        },
    });

  export default myTheme;
  