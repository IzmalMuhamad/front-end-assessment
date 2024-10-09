import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {

    const { token } = useSelector(state => state.authToken);

    // console.log(token);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}