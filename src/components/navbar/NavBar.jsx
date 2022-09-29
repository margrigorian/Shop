import React from 'react';
import style from "./NavBar.module.css";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Search, PersonOutlineOutlined, ShoppingCartOutlined, MenuOutlined } from "@mui/icons-material"; 

export default function NavBar() {
  return (
    <AppBar
        sx={{ 
            backgroundColor: "white",
            color: "rgb(33, 32, 32)" 
        }}
    >
        <Toolbar>
            <IconButton
                // color='inherit'
                sx={{ marginRight: "10px"}} 
            >
                <MenuOutlined />
            </IconButton>
            <div className={style.logo}>
                <Typography
                    variant='h6'   
                    sx={{ 
                        fontFamily: "Segoe Script",
                        fontSize: "25px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "inline" // курсор сработает только на тексте
                    }}
                >
                    michelle
                </Typography>
            </div>
            <IconButton
                sx={{ color: "rgb(52, 51, 51)"}}
            >
                <Search />
            </IconButton>
            <IconButton
                sx={{ color: "rgb(52, 51, 51)"}}
            >
                <PersonOutlineOutlined />
            </IconButton>
            <IconButton
                sx={{ color: "rgb(52, 51, 51)"}}
            >
                <ShoppingCartOutlined />
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
