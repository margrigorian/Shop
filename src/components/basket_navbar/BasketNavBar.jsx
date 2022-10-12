import React from 'react';
import style from "./BasketNavBar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { Typography } from '@mui/material';

export default function BasketNavBar({closeBasketNavBar}) {
    const navigate = useNavigate();
    
    return (
        <div>
            <header className={style.header}>
                <WestIcon 
                    sx={{fontSize: "20px", color: "rgb(52, 51, 51)", cursor: "pointer"}} 
                    onClick={() => {
                        navigate(-1)
                        closeBasketNavBar(false)
                    }}
                />
                <div>
                    <NavLink 
                        to={`/`} 
                        className={style.logo} 
                        style={{textDecoration: "none"}}
                        onClick={() => closeBasketNavBar(false)}
                    >
                        <Typography
                            variant='h6'   
                            sx={{ 
                                fontFamily: "Segoe Script",
                                fontSize: "30px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: "inline" 
                            }}
                        >
                            mishellelin
                        </Typography>
                    </NavLink>
                </div>
                <p></p>
            </header>
        </div>   
    )
}
