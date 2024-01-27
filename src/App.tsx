import React from 'react';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login-page";
import Register from "./pages/register-page";

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
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
