import React from 'react';
import style from "./OrderSummary.module.css";
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';

export default function OrderSummary() {
    const fullBasket = useSelector(selectBasket);
    const basketProducts = fullBasket.basket.products;
    const freeShippingOver = 49900;
    const delivery = 2900;

    const sum = basketProducts.reduce((sum, current) => {
        return sum + current.count * current.price
    }, 0)

    const total = +sum.toFixed(2); // округление до сотых

    return (
        <div className={style.container}>
            <div className={style.orderElement}>
                <p 
                    className={style.orderElement}
                >
                    {basketProducts.length} {basketProducts.length === 1 ? "Product" : "Products"}
                </p>
                <p>{total} AMD</p>
            </div>
            <div className={style.orderElement}>
                <p>Delivery charges</p>
                <p>{delivery} AMD</p>
            </div>
            <div className={style.orderElement}>
                <p>Free Shipping Over 49,900 AMD</p>
                <p>-{delivery} AMD</p>
            </div>
            <div className={style.total}>
                <p>TOTAL</p>
                <p>
                    {
                        total > freeShippingOver ? `${total} AMD` : `${total + delivery} AMD`
                    }
                </p>
            </div>
        </div>
    )
}
