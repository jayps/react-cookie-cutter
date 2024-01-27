import React from "react";
import BasePageContainer from "../../components/base-page-container";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/form-input";
import {Link} from "react-router-dom";

type LoginInputs = {
    email: string
    password: string
}

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInputs>()
    const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data)

    return (
        <BasePageContainer>
            <div className="flex flex-col justify-center min-h-svh">
                <div className="card">
                    <h1 className="h1">
                        Log in
                    </h1>
                    <hr className="my-4"/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput name="email" label="E-mail" type="email" error={errors?.email} register={register} />
                        <FormInput name="password" label="Password" type="password" error={errors?.password} register={register} />
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Log in
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