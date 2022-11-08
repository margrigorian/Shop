import React, { useState, useEffect } from 'react';
import style from "./AccessoriasPage.module.css";
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import request from '../../store/request/request';
import { accessoriasLink } from '../../store/request/link';
import MassimoProducts from '../../components/massimo_products/MassimoProducts';

export default function AccessoriasPage() {
    const basketProducts = useSelector(selectBasket);
    const [collectionProducts, setCollectionProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const products = await request("GET", accessoriasLink, undefined, basketProducts.token);
            setCollectionProducts(products.data.data.items);
        }

        getProducts();

    }, [basketProducts.token])

    return (
        <div className={style.container}>
        <div className={style.headColorBlock}>ACCESSORIAS</div>
        {
            collectionProducts.length !== 0 ? 
                <MassimoProducts allProducts={collectionProducts} /> : undefined
        }
        
    </div>
    )
}
