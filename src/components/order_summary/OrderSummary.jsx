import React from 'react';
import style from "./OrderSummary.module.css";
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';

export default function OrderSummary() {
    const fullBasket = useSelector(selectBasket);
    const basketProducts = fullBasket.basket.products;
    const freeShippingOver = 49900;
    const delivery = 2900;

    const total = basketProducts.reduce((sum, current) => {
        return sum + current.count * current.price
    }, 0)

    return (
        <div className={style.container}>
            <div className={style.orderElement}>
                <p className={style.orderElement}>{basketProducts.length} Products</p>
                <p className={style.price}>{total} AMD</p>
            </div>
            <div className={style.orderElement}>
                <p>Delivery charges</p>
                <p className={style.price}>{delivery} AMD</p>
            </div>
            <div className={style.orderElement}>
                <p>Free Shipping Over 49,900 AMD</p>
                <p className={style.price}>-{delivery} AMD</p>
            </div>
            <div className={style.total}>
                <p>TOTAL</p>
                <p className={style.price}>
                    {
                        total > freeShippingOver ? `${total} AMD` : `${total + delivery} AMD`
                    }
                </p>
            </div>
        </div>
    )
}
