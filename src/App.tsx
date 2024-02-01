import React from 'react';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login-page";
import Register from "./pages/register-page";
import AuthContextProvider from "./contexts/auth-context";
import Dashboard from "./pages/dashboard";

const App: React.FC = () => {
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
            element: <Dashboard/>,
        },
    ]);

    return (
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    );
}

export default App;
