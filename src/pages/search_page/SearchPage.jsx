import React, { useEffect, useState } from 'react';
import style from "./SearchPage.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import request from '../../store/request/request';
import { popProductsLink } from '../../store/request/link';
import { Divider } from '@mui/material';

export default function SearchPage({closeSearchNavBar}) {
  const token = useSelector(selectBasket);
  const [popularProducts, setPopularProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    async function getPopProducts() {
      const popProducts = await request("GET", popProductsLink, undefined, token.token);
      const random = popProducts.data.data.filter((item, i) => i > 0).map(item => item.items[Math.floor(Math.random() * item.items.length)]);
      setPopularProducts(popProducts.data.data);
      setRandomProducts(random);
    }
    
    getPopProducts();
    
  }, [token])

  return (
    <div className={style.container}>
      {
        popularProducts.length > 0 &&
          <div className={style.topTrendsContainer}>
            <p className={style.topTrendsText}>&mdash; TOP TRENDS SEARCHES</p>
            <div className={style.topProducts}>
                {
                  popularProducts[0].items.map(item =>
                    <NavLink 
                      to={`/product/${item.id}`} 
                      key={`ProductId-${item.id}`} 
                      style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                      onClick={() => closeSearchNavBar(false)}
                    >
                      <div 
                        className={style.currentProductContainer} 
                      >
                          <img src={item.src} alt="product" style={{width: "130px", height: "200px"}} />
                          <p className={style.productTitle}>{item.title}</p>
                          <p>{item.price} $</p>
                      </div>  
                    </NavLink>
                  )
                }
            </div>
            <Divider sx={{color: "lightGrey"}} />
            <p className={style.topTrendsText}>&mdash; SIMILAR SEARCHES</p>
            <div className={style.randomProducts}>
              {
                randomProducts.map(item => 
                  <NavLink 
                      to={`/product/${item.id}`} 
                      key={`ProductId-${item.id}`}
                      style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                      onClick={() => closeSearchNavBar(false)}
                    >
                    <div className={style.randomProductContainer}>
                      <img src={item.src} alt="product" style={{width: "130px", height: "200px"}} />
                      <p className={style.productTitle}>{item.title}</p>
                      <p>{item.price} $</p>
                    </div> 
                  </NavLink>
                )
              }
            </div>
          </div>
      }
    </div>
  )
}
