import React, { useContext, useEffect, useState } from 'react';
import styles from "./HomePageProfileClicker.module.scss";
import { GetProfile, SwitchRole } from '../../API/ApiRequest';
import DataContext from '../../context';


function HomePageProfileClicker() {
    const context = useContext(DataContext);
    const handleClick = () => {
        SwitchRole().then((res) => {
            if(res?.status === 200){
                funCheckRole();
            }
        })
    };

    const funCheckRole = () => {
        GetProfile().then((resp) => {
            if(resp?.status === 200){
                if(resp.data.data.role === 2){
                    context.setRole("Администратор");
                }else{
                    context.setRole("Пользователь");
                }
            }
        })
    }

    useEffect(() => {
        funCheckRole();
    },[])

    return ( 
        <div className={styles.HomePageProfileClicker}>
            <img src="/img/logo.svg" alt="Logo"/>
            
            <div className={styles.HomePageProfileClickerContainer}>
                <p>{context.role}</p>
                <div
                    className={`${styles.switch} ${context.role==="Администратор" ? styles['switch--checked'] : ''}`}
                    onClick={() => handleClick()}
                >
                    <div className={styles.switch__circle} />
                </div>
            </div>
           
        </div>
    );
}


export default HomePageProfileClicker;