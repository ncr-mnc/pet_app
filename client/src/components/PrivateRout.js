import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user} = useAuth();
    if(!user.isAuthenticated) {
        return <Navigate to='/login'/>
    } 
    return children;
};
export default PrivateRoute;