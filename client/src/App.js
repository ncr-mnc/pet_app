import './App.css';
import MainPage from './pages/HomePage';
import NavBar from './components/NavBar';
import myTheme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUpPage';
import CreateCard from './pages/CreateBoard';
import MyCards from './pages/MyCards';
import EditCard from './pages/EditCard';
import { AuthProvider } from './context/AuthContext';
import SingIN from './pages/SignInPage';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={myTheme}>
                <BrowserRouter>
                    <head >
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    </head>
                    <div className="App">
                        <NavBar/>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/signUp' element={<SignUp/>}/>
                            <Route path='/createBoard' element={<CreateCard/>}/>
                            <Route path='/myCards' element={<MyCards/>}/>
                            <Route path="/edit/:id" element={<EditCard/>}/>
                            <Route path='/signIn' element={<SingIN/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
