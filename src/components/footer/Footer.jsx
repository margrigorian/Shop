import React from 'react';
import style from "./Footer.module.css";
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  return (
    <footer className={style.footer}>
          <div className={style.footerNav}>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Help</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Company</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Contact</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Download our app</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Track your order</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Accessibility</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Store Locator</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Press</p>
            <p className={`${style.footerNavItem} ${style.footerNavEl}`}>Cookies setting</p>
          </div>
          <div className={style.socialContainer}>
            <div>
                <IconButton
                    sx={{color: "white", paddingLeft: 0}}
                >
                    <FacebookIcon />
                </IconButton>
                <IconButton
                    sx={{color: "white", paddingLeft: "5px"}}
                >
                    <TwitterIcon />
                </IconButton>
                <IconButton
                    sx={{color: "white", paddingLeft: "5px"}}
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    sx={{color: "white", paddingLeft: "5px"}}
                >
                    <PinterestIcon />
                </IconButton>
                <IconButton
                    sx={{color: "white", paddingLeft: "5px"}}
                >
                    <YouTubeIcon />
                </IconButton>
            </div>
            <div className={style.languageContainer}>
                <p className={`${style.cursor} ${style.countryName}`}>Armenia</p>
                <p>|</p>
                <p className={style.cursor}>ru</p>
                <p className={style.cursor}>en</p>
            </div>
          </div>
          <p className={`${style.bottomTextSize} ${style.footerNavEl}`}>Privacy Policy</p>
          <p className={`${style.bottomTextSize} ${style.footerNavEl}`}>Purchase Conditions</p>
          <p className={`${style.bottomTextSize} ${style.footerNavEl}`}>Cookies Information</p>
        </footer>
  )
}
