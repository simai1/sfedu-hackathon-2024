import React, { useContext } from 'react';
import styles from "./HomePageTableMenu.module.scss";
import DataContext from '../../context';
import UneversalList from '../UneversalList/UneversalList';

function HomePageTableMenu() {
    const context  = useContext(DataContext);
    
    const getToPathname = () => {
        switch (context?.activeTable) {
            case "office":
                return "офис";
            case "Equipment":
                return "оборудование";
            case "Staff":
                return "сотрудника";
            default:
                return "";
        }
    } 

    return (
        <div className={styles.HomePageTableMenu}>
            <div className={styles.Search}>
                <div className={styles.InputContainer}>
                    <input
                        type="text"
                        className={styles.SearchInput}
                        placeholder="Поиск"
                    />
                    <img src="/img/loop.svg" alt="Search" className={styles.SearchIcon} />
                </div>
                {/* <div>
                    <UneversalList/>
                </div> */}
            </div>
            <div className={styles.HomePageButtonNewEmployee}>
                <button>
                    <img src="/img/edit.svg" alt="Plus" />
                    <span>Редактировать</span>
                </button>
                <button>
                    <img src="/img/plus.svg" alt="Plus" />
                    <span>Добавить {getToPathname()}</span>
                </button>
                <button>
                    <img className={styles.deleteIcon} src="/img/delete.svg" alt="Plus" />
                    <span>Удалить</span>
                </button>
               
            </div>
        </div>
    );
}

export default HomePageTableMenu;