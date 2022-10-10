import React from 'react';
import style from "./Menu.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';

export default function Menu({closeMenu}) {
  return (
    <div className={style.menuContainer}>
        <div className={style.menuHeader}>
            <div className={style.closeContainer}>
                <p className={style.closeIcon} onClick={() => closeMenu()}>&#x2717;</p>
                <p className={style.menuHeaderText}>MENU</p>
            </div>
            <div className={style.searchContainer}>
                <SearchIcon 
                    sx={{
                        marginRight: "10px",
                        color: "rgb(68, 67, 67)"
                    }}
                />
                <input 
                    type="search" 
                    placeholder='What are you looking for?'
                    className={style.searchInput}
                />
            </div>
                      
        </div>

        <div className={style.menuContentContainer}>
            <div className={style.menuList}>
                <p className={`${style.menuListItem} ${style.listItemMarginBottom}`}>LIMITED EDITION</p>
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
            <div className={style.menuImage}>

            </div>
        </div>
    </div>
  )
}
