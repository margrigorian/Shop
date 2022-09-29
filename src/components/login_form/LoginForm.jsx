import React from 'react';
import style from "./LoginForm.module.css";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    // useForm - это метод, который возварщает объект
    const { register, formState: { errors }, reset, handleSubmit} = useForm({
        mode:"onBlur"
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        reset();
    };

    return (
            <div className={style.formContainer}>
                <p className={style.closeIcon}>&#x2717;</p>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)} >
                    <p className={style.loginHeaderText}>Log in</p>
                    <p className={style.enterYourDataText}>Enter your email and password to enter</p>

                    <div className={style.loginInputContainer}>
                        <input {...register("login", {
                            required: true,
                            pattern: {
                                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                message: "Please enter a valid email address"
                            }
                        })} 
                            className={style.input}
                            placeholder='Email address *'
                            style={{ borderColor: errors?.login && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.login && <p>{errors?.login?.message || "This field is required"}</p>}
                        </div>
                    </div>

                    <div className={style.passwordInputContainer}>
                        <input {...register("password", {
                            required: true,
                            minLength: {
                                value: 5,
                                message: "Minimum of 8 characters"
                            }
                        })} 
                            type="Password"
                            className={style.input}
                            placeholder='Password *'
                            style={{ borderColor: errors?.password && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.password && <p>{errors?.password?.message || "This field is required"}</p>}
                        </div>
                    </div>
                        
                    <p className={style.forgottenPasswordText}>Forgotten your password?</p>
                    <div className={style.checkboxContainer}>
                        <input type="checkbox" id="session" className={style.checkbox} />
                        <label htmlFor='session' className={style.checkboxLabel}>Keep session open</label>
                    </div>
                    <button type="submit" className={`${style.button} ${style.submitButton}`}>Log in</button>
                </form>
                
                <div className={style.createButtonContainer}>
                    <p>Don't have an account?</p>
                    <button className={`${style.button} ${style.createButton}`}>Create Account</button>
                </div>
            </div>
  )
}
