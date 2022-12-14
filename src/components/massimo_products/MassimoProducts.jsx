import React from 'react';
import style from "./MassimoProducts.module.css";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../store/slices/slice-products';
import { addToBasket } from '../../store/slices/slice-basket';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

export default function MassimoProducts({allProducts}) {
    const dispatch = useDispatch();
    
    return (
        <div className={style.container}>
            {
                allProducts.map(item => 
                    <div key={`productId-${item.id}`} className={style.productsContainer}>
                        <NavLink to={`/product/${item.id}`}>
                            <div 
                                style={{backgroundImage: `url(${item.src}`}} 
                                className={style.productsImage}
                            >
                            </div>
                        </NavLink>
                        <div className={style.productsTitleContainer}>
                            <NavLink 
                                to={`/product/${item.id}`} 
                                className={style.productTitle}
                            >
                                {item.title}
                            </NavLink>
                            {/* <p className={style.productTitle}>{item.title}</p> */}
                            <div className={style.iconsContainer}>
                                <AddIcon 
                                    sx={{fontSize: 20, cursor: "pointer", color: "rgb(73, 73, 39)"}}
                                    onClick={() => {
                                        dispatch(add(item.id))
                                        dispatch(addToBasket(item))
                                    }}
                                />
                                <BookmarkBorderOutlinedIcon sx={{fontSize: 20, cursor: "pointer", color: "lightGrey"}} />
                            </div>
                        </div>
                        <p className={style.price}>{item.price} AMD</p>
                    </div>
                )
            }
        </div>
    )
}
