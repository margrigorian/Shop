import React from 'react';
import style from "./RegistrationForm.module.css";
import { useForm } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

export default function RegistrationForm({changeRegistrationMode, getSuccessRegistrationMessage}) {

    const { register, formState: { errors }, reset, handleSubmit} = useForm({
        mode:"onBlur"
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        reset();
    };

    return (
        <div className={style.registrationFormContainer}>
            <p className={style.closeIcon} onClick={() => changeRegistrationMode()}>&#x2717;</p>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <p className={style.registrationHeaderText}>Create Account</p>
                
                <div className={style.radioContainer}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <div className={style.radioFemale}>
                            <FormControlLabel {...register("gender")} 
                                value="female" 
                                control={<Radio />} 
                                label="Female"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 30,
                                        color: "rgb(211, 211, 211)"
                                    },
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: 14,
                                        letterSpacing: "0.5px"
                                    }
                                }}
                            />
                        </div>

                        <FormControlLabel {...register("gender")} 
                            value="male" 
                            control={<Radio />} 
                            label="Male" 
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 30,
                                    color: "rgb(211, 211, 211)"
                                },
                                '& .MuiFormControlLabel-label': {
                                    fontSize: 14,
                                    letterSpacing: "0.5px"
                                }
                            }}
                        />
                    </RadioGroup>
                </div>

                <div className={style.inputContainer}>
                    <input {...register("name", {
                            required: true,
                        })} 
                        className={style.input}
                        placeholder='Name'
                        style={{ borderColor: errors?.name && "rgb(212, 31, 31)" }}
                    />
                    <div className={style.error}>
                        {errors?.name && <p>This field is required</p>}
                    </div>
                </div>
                
                <div className={style.inputContainer}>
                    <input {...register("surname", {
                            required: true,
                        })} 
                        className={style.input}
                        placeholder='Surname'
                        style={{ borderColor: errors?.surname && "rgb(212, 31, 31)" }}
                    />
                    <div className={style.error}>
                        {errors?.surname && <p>This field is required</p>}
                    </div>
                </div>

                <div className={style.inputContainer}>
                        <input {...register("login", {
                            required: true,
                            pattern: {
                                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                message: "Please enter a valid email address"
                            }
                        })} 
                            className={style.input}
                            placeholder='Email address'
                            style={{ borderColor: errors?.login && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.login && <p>{errors?.login?.message || "This field is required"}</p>}
                        </div>
                    </div>

                    <div className={style.inputContainer}>
                        <input {...register("password", {
                            required: true,
                            minLength: {
                                value: 5,
                                message: "Minimum of 5 characters"
                            }
                        })} 
                            type="Password"
                            className={style.input}
                            placeholder='Password'
                            style={{ borderColor: errors?.password && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.password && <p>{errors?.password?.message || "This field is required"}</p>}
                        </div>
                    </div>

                    <FormGroup>
                        <div className={style.checkboxPolicyContainer}>
                            <FormControlLabel {...register("acceptPrivacyPolicy", {
                                required: true
                            })} 
                                control={<Checkbox />} 
                                // ПОСЛЕ ОТПРАВКИ ФОРМЫ ОСТАЕТСЯ ВЫДЕЛЕННЫМ. ПОЧЕМУ НЕ РАБОТАЕТ RESET?
                                // менять значение через onchange и state? 

                                // label="I accept the Privacy Policy"
                                // id="privacyPolicy" не связывает с <label>
                                sx={{ 
                                    '& .MuiSvgIcon-root': { 
                                        fontSize: 30, 
                                        color: errors?.acceptPrivacyPolicy ? "rgb(212, 31, 31)" : "rgb(192, 190, 190)"
                                    },
                                    // '& .MuiFormControlLabel-label': {
                                    //     fontSize: 12,
                                    //     letterSpacing: "0.5px"
                                    // }
                                }}
                            />
                            <label className={style.checkboxLabel}>
                                I accept the <span className={style.policySpan}>Privacy Policy</span>
                            </label>
                        </div>

                        <div className={style.checkboxReceiveNewsContainer}>
                            <FormControlLabel {...register("recieveNews")} 
                                control={<Checkbox />} 
                                // label="I agree to receive news, notifications and offers from Massimo Dutti" 
                                sx={{ 
                                    '& .MuiSvgIcon-root': { 
                                        fontSize: 30, 
                                        color: "rgb(192, 190, 190)"
                                    },
                                    // '& .MuiFormControlLabel-label': {
                                    //     fontSize: 12,
                                    //     letterSpacing: "0.5px"
                                    // }   
                                }}
                            />
                            <label className={style.checkboxLabel}>
                                I agree to receive news, notifications and offers from Michelle
                            </label>
                        </div>
                    </FormGroup>
                    <button 
                        type="submit" 
                        className={style.submitButton}
                        // onClick={() => getSuccessRegistrationMessage()} // не использовать при этом button
                        // менять state в случае положительного ответа иначе
                    >
                        Create Account
                    </button>
            </form>
        </div>
    )
}
