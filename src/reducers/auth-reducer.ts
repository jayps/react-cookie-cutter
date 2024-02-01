import {AuthActions} from "../types/auth/auth-actions";
import {User} from "../types/user/user";

export interface AuthState {
    isLoggedIn: boolean;
    currentUser: User | undefined;
}

export const AuthReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state, isLoggedIn: action.payload
            }
        case 'SET_CURRENT_USER':
            console.log('Setting user...', action.payload);
            return {
                ...state, currentUser: action.payload
            }
        default: return state;
    }
}