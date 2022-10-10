import React from 'react';
import style from "./StartPage.module.css";
import { NavLink } from 'react-router-dom';

export default function StartPage() {
  return (
    <div className={style.container}>
        <div className={style.largePicture}></div>
        <div className={style.newInContainer}>
          <p className={style.newInText}>NEW IN</p>
          <p className={style.dialogsText}>DIALOGS</p>
        </div>
        <div className={style.containerLimitedEdition}>
          <div className={style.limitedEditionPoster}></div>
          <p>LIMITED EDITION FW.22</p>
        </div>
        <div>
          <div className={style.sibscribeLargeContainer}>
            <div className={style.sibscribeSmallContainer}>
              <p className={style.storyText}>STORIES</p>
              <div>
                <p className={style.sibscribeDescription}>Sibscribe to our Newsletter and we will send you information
                about our new products and trends.</p>
                <button className={style.buttonSibscribe}>Sibscribe</button>
              </div>
            </div>
            <div className={style.goToContainer}>
              <p>Go to:</p>
              <p className={style.goToElement}>New In</p>
              <p className={style.goToElement}>Collection</p>
              <p className={style.goToElement}>Limited Edition</p>
            </div>
          </div>
        </div>
    </div>
  )
}
