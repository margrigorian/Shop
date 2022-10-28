import React, { useEffect, useState } from 'react';
import style from "./SearchNavBar.module.css";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchNavBar({closeSearchNavBar, getSearchProducts}) {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const handle = setTimeout(async () => {
            if(inputText !== "") {
                getSearchProducts(inputText);
            }
        }, 1000) // пока будет происходить новый запрос с задержкой в секунду, старый удалится

        return () => {
           clearTimeout(handle); // запросы не будет происходить одновременно и не будут накладываться друг на друга
        } 
    }, [inputText, getSearchProducts])

    return (
        <div className={style.container}>
            <p></p>
            <div className={style.searchContainer}>
                <SearchIcon 
                    sx={{
                        marginRight: "10px",
                        color: "rgb(68, 67, 67)"
                    }}
                />
                <input 
                    type="search" 
                    placeholder='ENTER WHAT YOU ARE SEARCHING FOR'
                    className={style.searchInput}
                    value={inputText}
                    onChange={(evt) => setInputText(evt.target.value)}
                />
            </div>
            <CloseIcon 
                sx={{fontSize: "45px", paddingRight: "20px", color: "rgb(52, 51, 51)", cursor: "pointer"}} 
                onClick={() => {
                    closeSearchNavBar(false)
                    navigate(-1)
                }}
            />
        </div>
    )
}
