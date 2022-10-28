import React from 'react';
import style from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import { IconButton, Typography } from "@mui/material";
import { Search, PersonOutlineOutlined, ShoppingCartOutlined, MenuOutlined } from "@mui/icons-material"; 

export default function NavBar({openMenu, openLoginDrawer, openBasketDrawer, openSearchNavBar}) {
    const basketProducts = useSelector(selectBasket);
    const token = useSelector(selectBasket);

    return (
            <div className={style.navBar}>
                <div className={style.logoContainer}>
                    <div
                        onClick={() => {token.token === "" ? openLoginDrawer() : openMenu()}}
                    >
                        <IconButton
                            sx={{ marginRight: "10px"}} 
                            // onClick={openMenu}
                        >
                            <MenuOutlined />
                        </IconButton>
                    </div>
                    <div>
                        <NavLink to={`/`} className={style.logo}>
                            <Typography
                                variant='h6'   
                                sx={{ 
                                    fontFamily: "Segoe Script",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    display: "inline" // курсор сработает только на тексте
                                }}
                            >
                                mishellelin
                            </Typography>
                        </NavLink>
                    </div>
                </div>

                <div className={style.navBarElementContainer}>
                    <NavLink 
                        // to={token !== "" ? '/collection-page/' : undefined} 
                        className={style.navBarElement} 
                        onClick={() => token.token === "" ? openLoginDrawer() : undefined} // переход на страницу
                        // activeclassname={style.active}
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink 
                        to={token.token !== "" ? '/limited-edition-page/' : undefined} 
                        className={style.navBarElement}
                        onClick={() => token.token === "" ? openLoginDrawer() : undefined}
                        // activeclassname={style.active} 
                    >
                        LIMITED EDITION
                    </NavLink>
                </div>

                <div className={style.iconContainer}>
                    <NavLink 
                        to={token.token !== "" ? "/search" : undefined} 
                        style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                        onClick={() => {
                            if(token.token === "") {
                                openLoginDrawer();
                            }else {
                                openSearchNavBar(true);
                            }
                        }}
                    >
                        <div className={`${style.searchContainer} ${style.iconHover}`}>
                            <Search style={{color: "lightgrey"}} className={style.iconHover} />
                            <p>Search</p>
                        </div>
                    </NavLink>
                    <p onClick={openLoginDrawer} className={style.iconHover}>Log in</p>
                    <p 
                        onClick={() => {token.token === "" ? openLoginDrawer() : openBasketDrawer()}}
                        className={`${style.myShoppingBasketContainer} ${style.iconHover}`}
                    >
                        My shopping basket <span>
                            <sup>
                                <button className={style.basketSup}>
                                    {basketProducts.basket.products.length}
                                </button>
                            </sup>
                        </span>
                    </p>
                </div>
            </div>

    )
}
