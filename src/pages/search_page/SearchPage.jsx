import React, { useEffect, useState } from 'react';
import style from "./SearchPage.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import request from '../../store/request/request';
import { popProductsLink } from '../../store/request/link';
import { Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function SearchPage({closeSearchNavBar, categoriesProducts}) {
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

  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const representedProducts = categoriesProducts.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    if(categoriesProducts.length === 0) {
        setCurrentPage(1);
      }
  }, [categoriesProducts])

  return (
    <div className={style.container}>
      {
        categoriesProducts.length === 0 ? 
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
              </div> : 
              
              <div>
                <Stack spacing={2}>
                  <Pagination 
                    // variant="outlined" 
                    // shape="rounded" 
                    page={currentPage}
                    count={Math.ceil(categoriesProducts.length / productPerPage)} 
                    onChange={(evt, num) => setCurrentPage(num)}
                    sx={{margin: "20px 0 0 74%"}}
                  />
                </Stack>
                <div className={style.searchProductContainer}>
                    {
                      representedProducts.map(item =>
                        <NavLink 
                          to={`/product/${item.id}`} 
                          key={`ProductId-${item.id}`} 
                          style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                          onClick={() => closeSearchNavBar(false)}
                        >
                          <div 
                            className={style.currentSearchProductContainer} 
                          >
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
