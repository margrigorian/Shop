import React from 'react';
import style from "./LoginDrawer.module.css";
import { Drawer } from '@mui/material';
import LoginForm from '../login_form/LoginForm';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../store/slices/slice-basket';

export default function LoginDrawer({openCart, closeCart, changeRegistrationMode, openRegistrationForm}) {
    const token = useSelector(selectBasket);
    
    return (
        <div
            onClick={() => token.token !== "" ? closeCart() : undefined}
        >
            <Drawer
                anchor='right'
                // onClose={closeCart} // закрытие при клике в любое пространство
                open={openCart}
                // hideBackdrop // перекрывает все страницу и нет скролла
            >
                <LoginForm 
                    closeCart={closeCart} 
                    changeRegistrationMode={changeRegistrationMode} 
                    openRegistrationForm={openRegistrationForm}
                />
            </Drawer>
        </div>
    )
}
