import { useAuth } from "../auth/AuthContext";
import {Navigate} from 'react-router-dom'

export default function ProtectedRoutes ({children, roles}) {
    const {user} = useAuth();

    if(!user) return <Navigate to='/login'/>
    if(roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />

    return children
}