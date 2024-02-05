import React, {PropsWithChildren} from "react";
import {AuthReducer, AuthState} from "./auth-reducer";
import {AuthActions} from "./auth-actions";

// TODO: Add type for User
// TODO: extend AuthState to have token and currentUser
// TODO: When logged in, disable auth and registration routes and redirect users to dashboard route
// TODO: When logged out, disable dashboard route and redirect users to login.
const initialState: AuthState = {
    isLoggedIn: false,
    currentUser: undefined,
}
export const AuthContext = React.createContext<{
    currentUser: any,
    isLoggedIn: boolean,
    dispatch: React.Dispatch<AuthActions>
}>({...initialState, dispatch: () => {}});

const AuthContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [authState, dispatch] = React.useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{...authState, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;