import React from 'react';
import style from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import { getToken } from '../../store/slices/slice-basket';
import { useDispatch } from 'react-redux';
import request from '../../store/request/request';
import { tokenLink } from '../../store/request/link';

export default function LoginForm({closeCart, changeRegistrationMode, openRegistrationForm}) {
    const token = useSelector(selectBasket);
    const dispatch = useDispatch();
    // useForm - это метод, который возварщает объект
    const { register, formState: { errors }, reset, handleSubmit} = useForm({
        mode:"onBlur"
    });

    const onSubmit = (data) => {
        reset();

        async function getNewToken(data) {
            const userToken = await request("POST", tokenLink, data, "token");
            dispatch(getToken({userToken: userToken.data.data.token}));
            // if(token.token) { // НЕ СРАБАТЫВАЕТ НА УСЛОВИИ. ПОЧЕМУ?
                closeCart();
            // }
        }
        
        getNewToken(data);
        
    };

    return (
            <div className={style.formContainer} onClick={(event) => event.stopPropagation()}>
                <p 
                    className={style.closeIcon} 
                    onClick={() => token.token !== "" ? closeCart() : undefined}
                >
                    &#x2717;
                </p>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)} >
                    <p className={style.loginHeaderText}>Log in</p>
                    <p className={style.enterYourDataText}>Enter your email and password to enter</p>

                    <div className={style.loginInputContainer}>
                        <input {...register("email", {
                            required: true,
                            pattern: {
                                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                message: "Please enter a valid email address"
                            }
                        })} 
                            className={style.input}
                            placeholder='Email address *'
                            style={{ borderColor: errors?.email && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.email && <p>{errors?.email?.message || "This field is required"}</p>}
                        </div>
                    </div>

                    <div className={style.passwordInputContainer}>
                        <input {...register("password", {
                            required: true,
                            minLength: {
                                value: 8,
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
                        <Checkbox 
                            sx={{ 
                                '& .MuiSvgIcon-root': { 
                                    fontSize: 30, 
                                    color: "rgb(192, 190, 190)"
                                }
                            }}
                        />
                        <label htmlFor='session' className={style.checkboxLabel}>Keep session open</label>
                    </div>
                    <button type="submit" className={`${style.button} ${style.submitButton}`}>Log in</button>
                </form>
                
                <div className={style.createButtonContainer}>
                    <p>Don't have an account?</p>
                    <button 
                        className={`${style.button} ${style.createButton}`}
                        style={{backgroundColor: openRegistrationForm ? "rgb(137, 136, 136)" : undefined}}
                        onClick={() => changeRegistrationMode()}
                    >
                        Create Account
                    </button>
                </div>
            </div>
  )
}
