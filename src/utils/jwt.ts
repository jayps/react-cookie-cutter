import {User} from "../types/user/user";
import {TokenData} from "../types/user/token-data";

export const parseJwt = (token: string): TokenData => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const getUserFromJwtData = (tokenData: TokenData): User => {
    return {
        id: tokenData.user_id,
        firstName: tokenData.first_name,
        lastName: tokenData.last_name,
        email: tokenData.email
    };
}