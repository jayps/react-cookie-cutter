export interface TokenData {
    token_type: string;
    exp: number;
    iat: number;
    jti: number;
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
}