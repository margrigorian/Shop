import React from 'react';
import style from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';
import { IconButton, Typography } from "@mui/material";
import { Search, PersonOutlineOutlined, ShoppingCartOutlined, MenuOutlined } from "@mui/icons-material"; 

export default function NavBar({openMenu, openLoginDrawer, openBasketDrawer}) {
    const basketProducts = useSelector(selectBasket);
    return (
            <div className={style.navBar}>
                <div className={style.logoContainer}>
                    <IconButton
                        sx={{ marginRight: "10px"}} 
                        onClick={openMenu}
                    >
                        <MenuOutlined />
                    </IconButton>
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
                    {/* <NavLink className={style.navBarElement} activeclassname={style.active}>NEW</NavLink> */}
                    <NavLink className={style.navBarElement} activeclassname={style.active}>COLLECTION</NavLink>
                    <NavLink 
                        to={'/limited-edition-page/'} 
                        className={style.navBarElement}
                        activeclassname={style.active} 
                    >
                        LIMITED EDITION
                    </NavLink>
                </div>

                <div className={style.iconContainer}>
                    <IconButton
                        sx={{ color: "rgb(52, 51, 51)"}}
                    >
                        <Search />
                    </IconButton>
                    <IconButton
                        sx={{ color: "rgb(52, 51, 51)"}}
                        onClick={openLoginDrawer}
                    >
                        <PersonOutlineOutlined />
                    </IconButton>
                    <IconButton
                        sx={{ color: "rgb(52, 51, 51)"}}
                        onClick={openBasketDrawer}
                    >
                        <ShoppingCartOutlined />
                    </IconButton>
                    <sup >
                        <button className={style.basketSup}>
                        {basketProducts.basket.products.length}
                        </button>
                    </sup>
                </div>
            </div>

    )
}
