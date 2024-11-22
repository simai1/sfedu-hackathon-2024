import React, { useState } from 'react';
import styles from "./HomePageProfileClicker.module.scss";


function HomePageProfileClicker() {

    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        setIsChecked(!isChecked);
    };
    return ( 
        <div className={styles.HomePageProfileClicker}>
            <img src="/img/logo.svg" alt="Logo"/>
            
            <div className={styles.HomePageProfileClickerContainer}>
                <p>{isChecked ? 'Администратор' : 'Пользователь'}</p>
                <div
                    className={`${styles.switch} ${isChecked ? styles['switch--checked'] : ''}`}
                    onClick={handleClick}
                >
                    <div className={styles.switch__circle} />
                </div>
            </div>
           
        </div>
    );
}


export default HomePageProfileClicker;