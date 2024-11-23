import React, { useContext, useState } from 'react';
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
    const deleteItem = () => {
        console.log("context?.activeTable", context?.activeTable)
        switch (context?.activeTable) {
            case "office":
                if(context?.selectedRows.length >= 1) {
                    context.setPopUp("PopUpDeleteOffice")
                }
                return 0;
            case "Equipment":
                if(context?.selectedRows.length >= 1) {
                    context.setPopUp("PopUpDeleteEqupment")
                }
                return 0;
            case "Staff":
                if(context?.selectedRows.length >= 1) {
                    context.setPopUp("PopUpDeleteStaff")
                }
                return 0;
            default:
                return "";
        }
    }
    const getListToPathname = () => {
        switch (context?.activeTable) {
            case "office":
                return  <UneversalList
                        valueName={context.valueNameOffise}
                        setValueName={context.setValueNameOffise}
                        dataList={dataListOffise}
                        placeholder="Город"
                    />;
            case "Equipment":
                return <UneversalList
                valueName={context.valueNameEquipment}
                setValueName={context.setValueNameEquipment}
                dataList={dataListEquipment}
                placeholder="Категория"
            />;
            case "Staff":
                return <UneversalList
                valueName={context.valueNameStaff}
                setValueName={context.setValueNameStaff}
                dataList={dataListStaff}
                placeholder="Выбрать офис"
            />;
            default:
                return "";
        }
    }

    const dropFilter = () => {
        setSearchText('');
        switch (context?.activeTable) {
            case "office":
                context.setValueNameOffise("");
                return 0;
            case "Equipment":
                context.setValueNameEquipment("");
                return 0;
            case "Staff":
                context.setValueNameStaff("");
                return 0;
            default:
                return "";
        }
    }

    const addNewItem = () => {
        switch (context?.activeTable) {
            case "office":
                context.setPopUp("PopUpCreateOffice")
                return 0;
            case "Equipment":
                context.setPopUp("PopUpCreateEquipment")
                return 0;
            case "Staff":
                context.setPopUp("PopUpCreateWorker")
                return 0;
            default:
                return "";
        }
    }
    const dataListOffise = [
      { id: 1, name: "Таганрог" },
      { id: 2, name: "Ростов-на-Дону" },
      { id: 3, name: "Москва" },
    ]; // Sample data list
    const dataListEquipment = [
        { id: 1, name: "Ноутбуки" },
        { id: 2, name: "Столы" },
        { id: 3, name: "Лампы" },
        { id: 4, name: "Мониторы" },
        { id: 5, name: "Диваны" },
        { id: 6, name: "Принтеры" },
        { id: 7, name: "Компьютеры" },
        { id: 8, name: "Кофемашины" },
        { id: 9, name: "Клавиатуры" },
        { id: 10, name: "Стулья" },
      ]; // Sample data list
    
      const dataListStaff = [
        { id: 1, name: "Инженерный офис" },
        { id: 2, name: "Офис цифровых решений" },
        { id: 3, name: "Дизайн центр" },
      ]; // Sample data list
      const [searchText, setSearchText] = useState('');
    return (
        <div className={styles.HomePageTableMenu}>
            <div className={styles.Search}>
                <div className={styles.InputContainer}>
                    <input
                        type="text"
                        className={styles.SearchInput}
                        placeholder="Поиск"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <img src="/img/loop.svg" alt="Search" className={styles.SearchIcon} />
                </div>
                <div className={styles.FilterContainer}>
                {getListToPathname()}
                    <button className={styles.Filter} onClick={()=>dropFilter()}>Сброс <img src='/img/dropFilter.svg'/></button>
                </div>
            </div>
            <div className={styles.HomePageButtonNewEmployee}>
                <button>
                    <img src="/img/edit.svg" alt="Plus" />
                    <span>Редактировать</span>
                </button>
                <button onClick={() => addNewItem()}>
                    <img src="/img/plus.svg" alt="Plus" />
                    <span>Добавить {getToPathname()}</span>
                </button>
                <button onClick={()=> deleteItem()}>
                    <img className={styles.deleteIcon} src="/img/delete.svg" alt="Plus" />
                    <span>Удалить</span>
                </button>
               
            </div>
        </div>
    );
}

export default HomePageTableMenu;