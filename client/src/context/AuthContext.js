import { createContext,  useState , useEffect} from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser({
            isAuthenticated: false,
            token: '',
            username: '',
        });
    };
    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}