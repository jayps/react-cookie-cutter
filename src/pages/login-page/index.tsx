import React from "react";
import BasePageContainer from "../../components/base-page-container";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/form-input";
import {Link, useNavigate} from "react-router-dom";
import {API_URL} from "../../constants";
import Loader from "../../components/loader";
import {AuthContext} from "../../contexts/auth-context";
import {APIResponse} from "../../types/response";
import {AuthResponse} from "../../types/auth/auth-response";
import {getUserFromJwtData, parseJwt} from "../../utils/jwt";

type LoginInputs = {
    email: string
    password: string
}

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInputs>();
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const {isLoggedIn, currentUser, dispatch} = React.useContext(AuthContext);

    const onSubmit: SubmitHandler<LoginInputs> = (data) => submitLogin(data.email, data.password);

    const submitLogin = (email: string, password: string) => {
        setError('');
        setLoading(true);
        fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                response.json().then((responseData: APIResponse<AuthResponse>) => {
                   dispatch({type: 'SET_LOGGED_IN', payload: true});
                   const user = getUserFromJwtData(parseJwt(responseData.data.access));
                   localStorage.setItem('token', responseData.data.access);
                   dispatch({type: 'SET_CURRENT_USER', payload: user});
                   navigate('/dashboard');
                });
            } else {
                // TODO: Type error response
                response.json().then((responseData: any) => {
                    if (responseData.data?.detail) {
                        setError(responseData.data.detail);
                    }
                });
            }
        }).catch((error: any) => {
            console.error('Login promise error', error);
        });
    }

    return (
        <BasePageContainer>
            <div className="flex flex-col justify-center min-h-svh">
                <div className="card">
                    <h1 className="h1">
                        Log in {isLoggedIn ? 'true' : 'false'} -- User: {currentUser ? currentUser.firstName : 'n/a'}
                    </h1>
                    <hr className="my-4"/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput name="email" label="E-mail" type="email" error={errors?.email} register={register} required={true}/>
                        <FormInput name="password" label="Password" type="password" error={errors?.password} register={register} required={true}/>
                        {
                            error && (
                                <div className="alert alert-error">
                                    {error}
                                </div>
                            )
                        }
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {
                                    loading && <Loader size={24}/>
                                }
                                {
                                    loading ? 'Logging in...' : 'Log in'
                                }
                            </button>
                        </div>
                        <div className="text-right mt-2">
                            <Link to="/register">
                                Don't have an account yet? Register here.
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </BasePageContainer>
    )
}

export default LoginPage;