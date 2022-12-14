import React from 'react';
import style from "./BasketContent.module.css";
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import { useDispatch } from 'react-redux';
import { changeCount } from '../../store/slices/slice-products';
import { changeProductCountInBasket } from '../../store/slices/slice-basket';
import { remove } from '../../store/slices/slice-basket';
import { NavLink } from 'react-router-dom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import request from '../../store/request/request';
import { updateCountLink } from '../../store/request/link';
import { addRemoveProductLink } from '../../store/request/link';

export default function BasketContent({closeBasketNavBar, imgSize, productInfoContainerSize}) {
    // НЕ МОГУ ЧЕРЕЗ ПРОПСЫ ПЕРЕДАТЬ РАЗМЕР КАРТИНКИ, КОНТЕЙНЕРОВ... ПОЧЕМУ?
    const basketProducts = useSelector(selectBasket);
    const dispatch = useDispatch();

    function selectQuantity(product) {
        const quantity = [];

        if(product.maxCount !== undefined) {
            for(let i = 1; i <= product.maxCount; i++) {
                quantity.push(i);
            }
        }else {
            for(let i = 1; i <= 10; i++) {
                quantity.push(i);
            }
        }

        return quantity;
    }

    async function updateCount(productId, prevCount, newCount) {
        if(prevCount < newCount) {
            const update = await request("PUT", updateCountLink, {"product_id": productId, "action": "increase"}, basketProducts.token);
            console.log(update);
        }else {
            const update = await request("PUT", updateCountLink, {"product_id": productId, "action": "decrease"}, basketProducts.token);
            console.log(update);
        }
    }

    async function deteteProduct(productId) {
        const remove = await request("DELETE", addRemoveProductLink, {"product_id": productId}, basketProducts.token);
        console.log(remove);
      }

    return (
        <div className={style.container}>
                {
                    basketProducts.basket.products.map((item, i) => 
                        <div 
                            key={`ProductId-${item.id}`} 
                            className={style.productContainer}
                            style={{
                                borderBottom: (i+1) === basketProducts.basket.products.length ? "none" : undefined,
                                // width: imgSize,
                                // height: imgSize 
                            }}
                        >
                            <div className={style.productInfo}>
                                <NavLink to={`/product/${item.id}`} onClick={() => closeBasketNavBar()}>
                                    <div 
                                        style={{backgroundImage: `url(${item.src})`}} 
                                        className={style.productImg}>
                                    </div>
                                </NavLink>
                                <div className={style.titleContainer}>
                                    <NavLink 
                                        to={`/product/${item.id}`} 
                                        style={{textDecoration: "none", color: 'inherit'}}
                                        onClick={() => closeBasketNavBar()}
                                    >
                                        <div style={{fontWeight: "500"}} className={style.title}>{item.title}</div>
                                    </NavLink>
                                    <div className={style.quantityContainer}>
                                        <p>Quantity</p>
                                        <select value={item.count}
                                            onChange={
                                                (evt) => {
                                                    if(typeof item.id === "number") {
                                                        dispatch(changeCount({id: item.id, count: evt.target.value}))
                                                        dispatch(changeProductCountInBasket({id: item.id, count: evt.target.value}))
                                                    }else {
                                                        updateCount(item.id, item.count, evt.target.value);
                                                        dispatch(changeProductCountInBasket({id: item.id, count: evt.target.value}))
                                                    }
                                                }
                                            }
                                        >
                                            {
                                            selectQuantity(item).map(el => 
                                                    <option key={`OptionId-${el}`}>{el}</option>
                                                )
                                            }
                                        </select>
                                        <p>Size</p>
                                        <select defaultValue="S">
                                            <option>XS</option>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                    </div> 
                                </div>
                            </div>
                            <div className={style.priceContainer}>
                                <div className={style.price}>{item.price} AMD</div>
                                <div className={style.iconsContainer}>
                                    <div className={style.icons}>
                                        <BookmarkBorderOutlinedIcon 
                                            sx={{fontSize: "18px", color: "rgb(128, 128, 128)"}}
                                        />
                                        <DeleteOutlineIcon 
                                            sx={{fontSize: "19px"}}
                                            onClick={() => {
                                                if(typeof item.id === "number") {
                                                    dispatch(remove(item.id))
                                                }else {
                                                    deteteProduct(item.id);
                                                    dispatch(remove(item.id));
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* <NavLink to={`/product/${item.id}`}>
                                <div 
                                    style={{backgroundImage: `url(${item.url})`}} 
                                    className={style.productImg}>
                                </div>
                            </NavLink>
                            <div className={style.productInfo}>
                                <div className={style.titleContainer}>
                                    <NavLink 
                                        to={`/product/${item.id}`} 
                                        style={{textDecoration: "none", color: 'inherit'}}
                                    >
                                        <div style={{fontWeight: "500"}}>{item.title}</div>
                                    </NavLink>
                                    <div className={style.price}>{item.price} AMD</div>
                                </div>
                                <div className={style.selectContainer}>
                                    <div className={style.quantityContainer}>
                                        <p>Quantity</p>
                                        <select value={item.count}
                                            onChange={
                                                (evt) => {
                                                    dispatch(changeCount({id: item.id, count: evt.target.value}))
                                                    dispatch(changeProductCountInBasket({id: item.id, count: evt.target.value}))
                                                }
                                            }
                                        >
                                            {
                                            selectQuantity(item).map(el => 
                                                    <option key={`OptionId-${el}`}>{el}</option>
                                                )
                                            }
                                        </select>
                                        <p>Size</p>
                                        <select defaultValue="S">
                                            <option>XS</option>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                    </div>
                                    <div className={style.iconsContainer}>
                                        <BookmarkBorderOutlinedIcon 
                                            sx={{fontSize: "18px", color: "rgb(128, 128, 128)"}}
                                        />
                                        <DeleteOutlineIcon 
                                            sx={{fontSize: "19px"}}
                                            onClick={() => dispatch(remove(item.id))}
                                        />
                                    </div>
                                </div>
                            </div> */}
                        </div>    
                    )
                }
        </div>
    )
}
