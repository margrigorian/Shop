import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import style from "./CollectionPage.module.css";
import request from '../../store/request/request';
import { collectionLink } from '../../store/request/link';
import MassimoProducts from '../../components/massimo_products/MassimoProducts';

export default function CollectionPage() {
    const basketProducts = useSelector(selectBasket);
    const [collectionProducts, setCollectionProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const products = await request("GET", collectionLink, undefined, basketProducts.token);
            setCollectionProducts(products.data.data.items);
        }

        getProducts();

    }, [basketProducts.token])

    console.log(collectionProducts);

  return (
    <div className={style.container}>
        <div className={style.headColorBlock}>COLLECTION</div>
        {
            collectionProducts.length !== 0 ? 
                <MassimoProducts allProducts={collectionProducts} /> : undefined
        }
        
    </div>
  )
}
