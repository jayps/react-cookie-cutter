import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../../store/auth/auth-context";

const Logout = () => {
    const {dispatch} = useContext(AuthContext);
    React.useEffect(() => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
    }, []);

    return <Navigate to="/" />
}

export default Logout;