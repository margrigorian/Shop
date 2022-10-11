import React, { useState } from 'react';
import style from "./Reviews.module.css";
import { useForm } from "react-hook-form";

import { useDispatch } from 'react-redux';
import { addReviewToProduct } from '../../store/slices/slice-products';
import StarBorderIcon from '@mui/icons-material/StarBorder'; 

export default function Reviews({product}) {
    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        mode:"onBlur"
    });
    const dispatch = useDispatch();
    const [openTextArea, setOpenTextArea] = useState(false);
    const date = new Date();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"
                    ];
    const monthDay = date.getDate();
    const year = date.getFullYear();

    const onSubmit = (data) => {
        dispatch(addReviewToProduct({review: JSON.stringify(data), id: product.id}));
        reset();
    };

    return (
        <div className={style.container}>
            <p className={style.reviewsText}>
                Reviews&nbsp; 
                <sup>
                    <span className={style.reviewsNumberSpan}>
                        {product.reviews ? product.reviews.length : 0}
                    </span>
                </sup>
            </p>
            <div className={style.starsContainer}>
                <div className={style.grade}>
                    <div>
                        <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                        <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                        <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                        <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                        <StarBorderIcon sx={{fontSize: "26px"}} />
                    </div>
                    <p className={style.noReviewsText}>No reviews yet</p>
                    <button 
                        className={style.buttonLeaveReviews}
                        onClick={() => setOpenTextArea(true)}
                    >
                        {
                            product.reviews ? "Leave review" : "Be the first to review"
                        }
                    </button>
                </div>
            </div>

            {
                openTextArea &&
                    <form onSubmit={handleSubmit(onSubmit)} className={style.reviewForm}>
                        {/* <div className={style.nameInputContainer}>
                            <input {...register("name", { required: true })}
                                placeholder='Your name' 
                                className={style.input}
                                style={{ borderColor: errors?.name && "rgb(212, 31, 31)" }}
                            />
                            <div className={style.error}>
                                {errors?.name && <p>This field is required</p>}
                            </div>
                        </div> */}
                        <div className={style.commentInputContainer}>
                            <textarea {...register ("body", { required: true })}
                                placeholder='Your review' 
                                className={`${style.input} ${style.commentInput}`}
                                style={{ borderColor: errors?.body && "rgb(212, 31, 31)" }}
                            />
                            <div className={style.error}>
                                {errors?.body && <p>This field is required</p>}
                            </div>
                        </div>
                        <button type='submit' className={style.buttonAddReviews}>Add review</button>
                    </form>

                    // ДЛЯ РЕДАКТИРОВАНИЯ ОТЗЫВА ДОЛЖЕН ИСПОЛЬЗОВАТЬСЯ ОТДЕЛЬНЫЙ DISPATCH 
                    // + ДОЛЖЕН БЫТЬ ПЕРЕДАН ID ПОЛЬЗОВАТЕЛЯ ДЛЯ ПОИСКА СТАРОГО ОТЗЫВА В МАССИВЕ
            }

            {
                product.reviews &&
                    product.reviews.map((item, i) => 
                            <div key={`ReviewId-${i}`} className={style.reviewContainer}>
                                {/* ИМЯ БУДЕТ ИЗ ТОКЕНА */}
                                <p className={style.name}>Name</p>
                                <div className={style.review}>
                                    <p 
                                        className={style.date}
                                    >
                                        {`${monthNames[month-1]} ${monthDay}, ${year}`}
                                    </p>
                                    <p>{item.body}</p>
                                </div>
                            </div>
                    )
            }

        </div>
    )
}
