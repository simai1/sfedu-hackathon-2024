import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./HomePageProfileClicker.module.scss";
import { GetProfile, SwitchRole } from '../../API/ApiRequest';
import DataContext from '../../context';

function HomePageProfileClicker() {
    const context = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Create a ref for the dropdown

    const handleClick = () => {
        SwitchRole().then((res) => {
            if (res?.status === 200) {
                funCheckRole();
            }
        });
    };

    const funCheckRole = () => {
        GetProfile().then((resp) => {
            if (resp?.status === 200) {
                context.setRole(resp.data.data.role === 2 ? "Администратор" : "Пользователь");
            }
        });
    };

    useEffect(() => {
        funCheckRole();
    }, []);

    useEffect(() => {
        console.log("isOpen", isOpen);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the dropdown and the burger icon
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest(`.${styles.burgerIcon}`)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const clickLi = (value) => {
        context.setActiveTable(value);
        context.getTableData(value);
        setIsOpen(false);
    };

    return ( 
        <div className={styles.HomePageProfileClicker}>
            <img src="/img/logo.svg" alt="Logo"/>
            <div className={styles.HomePageProfileClickerContainer}>
                <p>{context.role}</p>
                <div
                    className={`${styles.switch} ${context.role === "Администратор" ? styles['switch--checked'] : ''}`}
                    onClick={handleClick}
                >
                    <div className={styles.switch__circle} />
                </div>
            </div>
            
            <div className={styles.BoorgerMobile}>
                <div className={styles.burgerMenu}>
                    <div className={`${styles.burgerIcon} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                    </div>
                    {isOpen && (
                        <div className={styles.menu} ref={dropdownRef}>
                            <ul>
                                <li onClick={() => clickLi("office")}><span style={{ borderBottom: context?.activeTable === "office" ? "1px solid #1A7D78" : "none", color: context?.activeTable === "office" ? "#1A7D78" : "inherit" }}>Мои офисы</span></li>
                                <li onClick={() => clickLi("Staff")}><span style={{ borderBottom: context?.activeTable === "Staff" ? "1px solid #1A7D78" : "none", color: context?.activeTable === "Staff" ? "#1A7D78" : "inherit" }}>Сотрудники</span></li>
                                <li onClick={() => clickLi("Equipment")}><span style={{ borderBottom: context?.activeTable === "Equipment" ? "1px solid #1A7D78" : "none", color: context?.activeTable === "Equipment" ? "#1A7D78" : "inherit" }}>Список оборудования</span></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePageProfileClicker;