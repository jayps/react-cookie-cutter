import React from "react";
import BasePageContainer from "../../components/base-page-container";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/form-input";
import {API_URL} from "../../constants";
import {Link} from "react-router-dom";
import Loader from "../../components/loader";

type RegisterInputs = {
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string;
}

const RegisterPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<RegisterInputs>();
    const [loading, setLoading] = React.useState(false);
    const [registrationComplete, setRegistrationComplete] = React.useState(false);
    const [error, setError] = React.useState('');

    const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
        setError('');
        const {firstName, lastName, email, password} = data;
        submitRegistration(firstName, lastName, email, password);
    }

    const submitRegistration = (firstName: string, lastName: string, email: string, password: string) => {
        setLoading(true);
        fetch(`${API_URL}/auth/register/`, {
            method: 'POST',
            body: JSON.stringify({firstName, lastName, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                setRegistrationComplete(true);
            } else {
                console.error('Registration error');
                response.json().then((responseData: any) => {
                    if (responseData.data) {
                        setError(responseData.data);
                    }
                });
            }
        }).catch((error: any) => {
            console.error('Registration promise error', error);
        });
    }

    return (
        <BasePageContainer>
            <div className="flex flex-col justify-center min-h-svh">
                <div className="card">
                    <h1 className="h1">
                        Register
                    </h1>
                    <hr className="my-4"/>
                    {
                        !registrationComplete && (

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormInput name="firstName" label="First name" type="text" error={errors?.firstName}
                                           register={register}
                                           required={true}/>
                                <FormInput name="lastName" label="Last name" type="text" error={errors?.lastName}
                                           register={register}
                                           required={true}/>
                                <FormInput name="email" label="E-mail" type="email" error={errors?.email}
                                           register={register}
                                           required={true}/>
                                <FormInput name="password" label="Password" type="password" error={errors?.password}
                                           register={register}
                                           required={true}/>
                                <FormInput name="repeatPassword" label="Repeat Password" type="password"
                                           error={errors?.repeatPassword}
                                           required={true}
                                           register={register}
                                           validator={(val: string) => {
                                               if (val != watch('password')) {
                                                   return "The passwords you entered don't match.";
                                               }
                                           }}
                                />
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
                                            loading ? 'Registering...' : 'Register'
                                        }
                                    </button>
                                </div>
                                <div className="text-right mt-2">
                                    <Link to="/">
                                        Already have an account? Log in here.
                                    </Link>
                                </div>
                            </form>
                        )
                    }
                    {
                        registrationComplete && (
                            <div className="alert alert-success">
                                Your registration is complete. You can now <Link to="/">log in.</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </BasePageContainer>
    )
}

export default RegisterPage;