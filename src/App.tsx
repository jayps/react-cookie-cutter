import React, {PropsWithChildren, useState, useEffect} from 'react';
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/login-page";
import Register from "./pages/register-page";
import Dashboard from "./pages/dashboard";
import {getUserFromJwtData, parseJwt} from "./utils/jwt";
import {User} from "./types/user/user";
import Loader from "./components/loader";
import UsersPage from "./pages/users";
import Logout from "./pages/logout";
import {AuthContext} from "./store/auth/auth-context";

const RequireAuth: React.FC<PropsWithChildren> = ({children}) => {
    const {isLoggedIn, currentUser, dispatch} = React.useContext(AuthContext);
    return isLoggedIn ? <>{children}</> : <Navigate to="/" replace/>
};

const App: React.FC = () => {
    const {isLoggedIn, currentUser, dispatch} = React.useContext(AuthContext);
    const [isUserChecked, setIsUserChecked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const userFromStorage = getUserFromJwtData(parseJwt(localStorage.getItem('token')!));
            if (userFromStorage) {
                dispatch({type: 'SET_CURRENT_USER', payload: userFromStorage});
                dispatch({type: 'SET_LOGGED_IN', payload: true});
            }
            setIsUserChecked(true); // Set isUserChecked to true after user check is done
        } else {
            setIsUserChecked(true); // Set isUserChecked to true if no token in local storage
        }
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/dashboard",
            element: <RequireAuth>
                <Dashboard/>
            </RequireAuth>,
        },
        {
            path: "/users",
            element: <RequireAuth>
                <UsersPage/>
            </RequireAuth>,
        },
        {
            path: "/logout",
            element: <RequireAuth>
                <Logout/>
            </RequireAuth>,
        },
    ]);

    return isUserChecked ? (
        <RouterProvider router={router}/>
    ) : <div className="flex justify-center items-center min-h-svh"><p>Please wait...</p></div>; // Render null until the user check is done
};

export default App;