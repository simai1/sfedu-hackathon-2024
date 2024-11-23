import { useContext } from "react";
import styles from "./HomePageTopMenu.module.scss";
import DataContext from "../../context";

function HomePageTopMenu() {
    const context = useContext(DataContext);
    console.log("context?.activeTable", context?.activeTable)
    const clickLi = (value) => {
        context.setSelectedRows([])
        context.setActiveTable(value)
    }
    return ( 
        <div className={styles.HomePageTopMenu}>
            <ul>
                <li onClick={() => clickLi("office")} style={{borderBottom: context?.activeTable === "office" &&  "1px solid #1A7D78" }}>Мои офисы</li>
                <li onClick={() => clickLi("Equipment")} style={{borderBottom: context?.activeTable === "Equipment" && "1px solid #1A7D78" }}>Список оборудования</li>
                <li onClick={() => clickLi("Staff")} style={{borderBottom: context?.activeTable === "Staff" &&  "1px solid #1A7D78" }}>Сотрудники</li>
            </ul>
        </div>
     );
}

export default HomePageTopMenu;