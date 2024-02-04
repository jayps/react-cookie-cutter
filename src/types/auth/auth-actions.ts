import {User} from "../user/user";

export type AuthActions =
    | { type: 'SET_LOGGED_IN'; payload: boolean }
    | { type: 'SET_CURRENT_USER'; payload: User }
    | { type: 'LOGOUT' };