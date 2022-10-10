import React, { useState } from 'react';
import style from "./LimitedEditionPage.module.css";
import MassimoProducts from '../../components/massimo_products/MassimoProducts';


export default function LimitedEditionPage() {
    const [activePageNavBarElement, setActivePageNavBarElement] = useState(true);

    return (
        <div className={style.container}>
            <div className={style.limitedEditionHeader}>
                <p className={`${style.limitedEditionText} ${style.cursor}`}>LIMITED EDITION</p>
                <div className={style.limitedEditionNavBarContainer}>
                    <p 
                        className={`${style.limitedEditionNavBarEl} ${style.cursor} ${style.colorHover}`}
                        style={{
                            borderBottom: !activePageNavBarElement ? "1.5px solid" : undefined
                        }}
                        onClick={() => setActivePageNavBarElement(false)}
                    >
                        LOOKBOOK
                    </p>
                    <p 
                        className={`${style.cursor} ${style.colorHover}`}
                        style={{borderBottom: activePageNavBarElement ? "1.5px solid" : undefined}}
                        onClick={() => setActivePageNavBarElement(true)}
                    >
                        COLLECTION
                    </p>
                </div>
                {/* <p></p> */}
            </div>

            <div className={style.largeTextContainer}>
                <div className={style.largeText}>
                    <p>LIMITED</p>
                    <p>EDITION</p>
                </div>
                <div className={style.largeText}>
                    <p>FALL AUTUMN</p>
                    <p>2022</p>
                </div>
            </div>

            <p className={style.capsule}>CAPSULE</p>

            <MassimoProducts />
        </div>
    )
}
