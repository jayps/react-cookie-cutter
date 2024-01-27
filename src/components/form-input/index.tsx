import React from "react";
import {Field, FieldError, FieldErrors, GlobalError, UseFormRegister} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";

export interface InputGroupProps {
    name: string;
    label: string;
    type: 'text' | 'password' | 'email';
    required?: boolean;
    error?: FieldError;
    register: UseFormRegister<any>;
    validator?: (val: string) => undefined | string;
}

const FormInput: React.FC<InputGroupProps> = ({name, label, error, type, required = false, register, validator}) => {
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
    const [rules, setRules] = React.useState<RegisterOptions>();

    React.useEffect(() => {
        const r: RegisterOptions = {required};
        if (validator) {
            r.validate = validator;
        }

        setRules(r);
    }, []);

    React.useEffect(() => {
        if (!error) {
            setErrorMessage(undefined);
            return;
        }

        if (error.type === 'required') {
            setErrorMessage('This field is required.');
            return;
        }

        if (error.message) {
            setErrorMessage(error.message)
            return;
        }

        setErrorMessage('Please enter a valid value for this field.');
    }, [error])

    return (
        <div className={`input-group ${error !== undefined && 'error'}`}>
            <label htmlFor={name} className="label">{label}</label>
            <input type={type} id={name} className="input" {...register(name, rules)} />
            {
                errorMessage && (
                    <span className="error-hint">
                        {errorMessage}
                    </span>
                )
            }
        </div>
    )
}

export default FormInput;