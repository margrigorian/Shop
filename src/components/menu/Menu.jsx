import React from 'react';
import style from "./Menu.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';

export default function Menu({closeMenu, setSearchNavBar}) {
  return (
    <div className={style.menuContainer}>
        <div className={style.menuHeader}>
            <p 
                className={style.menuHeaderText}
                onClick={() => closeMenu()}
            >
                BACK
            </p>
            <div className={style.searchContainer}>
                <SearchIcon 
                    sx={{
                        marginRight: "10px",
                        color: "lightgrey"
                    }}
                />
                <NavLink to='/search' style={{width: "100%"}}>
                    <input 
                        type="search" 
                        placeholder='WHAT ARE YOU LOOKING FOR?'
                        className={style.searchInput}
                        onClick={() => {
                            closeMenu();
                            setSearchNavBar(true);
                        }}
                    />
                </NavLink>
            </div>
                      
        </div>

        <div className={style.menuContentContainer}>
            <div className={style.menuList}>
                <NavLink to="/limited-edition-page" style={{textDecoration: "none"}} onClick={() => closeMenu()}>
                    <p className={`${style.menuListItem} ${style.listItemMarginBottom}`}>LIMITED EDITION</p>
                </NavLink>
                <p className={`${style.menuListItem} ${style.listItemMarginBottom}`}>NEW IN</p>
                <div className={style.listItemMarginBottom}>
                        <p 
                            className={`${style.menuListItem} ${style.collectionListItem} ${style.listItemPadding}`}
                        >
                            COLLECTION
                        </p>
                    <p className={`${style.menuListItem} ${style.listItemPadding}`}>ACCESSORIAS</p>
                    <p className={`${style.menuListItem} ${style.listItemPadding}`}>SHOES</p>
                </div>
                <div className={style.listItemMarginBottom}>
                    <p className={`${style.menuListItem} ${style.listItemPadding}`}>JOIN LIFE</p>
                    <p className={`${style.menuListItem} ${style.listItemPadding}`}>EDITORIAL</p>
                    <p className={`${style.menuListItem} ${style.listItemPadding}`}>PAPER</p>
                </div>
            </div>
            <Divider 
                orientation="vertical" 
                sx={{border: "2px solid rgb(231, 228, 228)"}}
            />
            <div className={style.menuImageContainer}>
                <div className={style.gif}></div>
                <div className={style.image}></div>
            </div>
        </div>
    </div>
  )
}
