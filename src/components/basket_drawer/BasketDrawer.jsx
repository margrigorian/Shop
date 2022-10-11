import React from 'react';
import style from "./BasketDrawer.module.css";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import { Drawer, Divider } from '@mui/material';
import BasketContent from '../basket_content/BasketContent';
import OrderSummary from '../order_summary/OrderSummary';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

export default function BasketDrawer({openCart, closeCart}) {
  const [activeChapter, setActiveChapter] = useState(true); 
  const basketProducts = useSelector(selectBasket); 

  return (
      <Drawer
          anchor='right'
          open={openCart}
          onClose={closeCart}
          // hideBackdrop={true}
      >
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.headerDrawerContainer}>
              <div 
                className={`${style.drawerHeader} ${style.basketContainer}`}
                style={{borderColor: activeChapter ? "rgb(52, 51, 51)" : undefined, 
                        color: activeChapter ? "rgb(52, 51, 51)" : undefined}}
                onClick={() => setActiveChapter(true)}
              >
                Basket ({basketProducts.basket.products.length})
              </div>
              <div 
                className={`${style.drawerHeader} ${style.wishListContainer}`}
                style={{borderColor: !activeChapter ? "rgb(52, 51, 51)" : undefined,
                        color: !activeChapter ? "rgb(52, 51, 51)" : undefined}}
                onClick={() => setActiveChapter(false)}
              >
                <p className={style.wishListHeaderText}>Wish list</p>
                <p 
                  className={style.closeIcon} 
                  onClick={(event) => {
                    event.stopPropagation() // чтобы не срабатывало измнение Chapter из-за клика в области контейнера
                    setActiveChapter(true) // сработают именно прописанные здесь функции
                    closeCart()
                  }}
                >
                  &#x2717;
                </p>
              </div>
            </div>
            <Divider />

            {
              activeChapter ? 
                  basketProducts.basket.products.length === 0 ?
                    <div className={style.basketContent}>
                      <div className={style.iconContainer}>
                        <ShoppingBagOutlinedIcon sx={{fontSize: 40}} />
                      </div>
                      <p className={`${style.textCentral} ${style.textAboutEmptyBasket}`}>Your shopping basket is empty</p>
                      <p className={`${style.textCentral} ${style.textAboutFavourites}`}>See if your favourites are in your basket or add items from the new collection</p>
                      <div className={style.buttonContainer}>
                        <button className={style.button}>See new collection</button>
                      </div> 
                    </div> : <div className={style.basketDrawerContent}><BasketContent /></div> :
                    
                    <div className={style.basketContent}>
                      <div className={style.iconContainer}>
                        <BookmarkBorderOutlinedIcon sx={{fontSize: 40}} />
                      </div>
                      <p className={`${style.textCentral} ${style.textAboutSeeWishList}`}>DO YOU WANT TO SEE YOUR WISHLIST?</p>
                      <p className={`${style.textCentral} ${style.textAboutSignUpOrLogin}`}>
                        <span className={style.textSpan}>Sign up</span> &nbsp;or&nbsp; <span className={style.textSpan}>Log in</span>
                      </p>
                    </div>
            }
          </div>

          {
            basketProducts.basket.products.length !== 0 && activeChapter ? 
                <div>
                  <OrderSummary />
                  <div className={style.buttonContainer}>
                    <button className={style.orderButton}>Go to your shopping basket</button>
                  </div>
                </div> : undefined
          }

        </div>
      </Drawer>
  )
}
