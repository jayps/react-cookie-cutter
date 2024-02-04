import React, {useContext} from "react";
import {AuthContext} from "../../contexts/auth-context";
import {Navigate} from "react-router-dom";

const Logout = () => {
    const {dispatch} = useContext(AuthContext);
    React.useEffect(() => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
    }, []);

    return <Navigate to="/" />
}

export default Logout;