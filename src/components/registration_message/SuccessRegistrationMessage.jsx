import React from 'react';
import style from "./SuccessRegistrationMessage.module.css";

export default function SuccessRegistrationMessage({getSuccessRegistrationMessage, changeRegistrationMode}) {
  return (
    <div className={style.messageContainer}>
        <p 
            className={style.closeIcon} 
            onClick={() => {
                getSuccessRegistrationMessage();
                changeRegistrationMode();
            }}
        >
            &#x2717;
        </p>
        <div className={style.textContainer}>
            {/* <p className={style.messageText}>CONGRATULATIONS, YOU HAVE<br />SUCCESSFULLY REGISTERED!</p> */}
            <p className={style.messageText}>Cogratulation, you <br />have succsessfully registeted!</p>
        </div>
    </div>
  )
}
