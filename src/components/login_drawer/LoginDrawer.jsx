import React from 'react';
import style from "./LoginDrawer.module.css";
import { Drawer } from '@mui/material';
import LoginForm from '../login_form/LoginForm';

export default function LoginDrawer({openCart, closeCart, changeRegistrationMode, openRegistrationForm}) {

    return (
        <div>
            <Drawer
                anchor='right'
                onClose={closeCart} // закрытие при клике в любое пространство
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
