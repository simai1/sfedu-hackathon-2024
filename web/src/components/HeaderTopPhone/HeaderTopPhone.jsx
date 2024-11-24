import { useContext, useRef } from "react";
import DataContext from "../../context";
import styles from "./HeaderTopPhone.module.scss";
import { generateAndDownloadExcel } from "../HomePageTableMenu/function";

function HeaderTopPhone(props) {
    const context  = useContext(DataContext); 
 
    return ( 
        <div className={styles.HeaderTopPhone}>
                 <div className={styles.InputContainer}>
                    <input
                        type="text"
                        className={styles.SearchInput}
                        placeholder="Поиск"
                        value={context.searchText}
                        onChange={(e) => context.setSearchText(e.target.value)}
                    />
                    <img src="/img/loop.svg" alt="Search" className={styles.SearchIcon} />
                </div>
                <div className={styles.Export}>
                    <button onClick={() => generateAndDownloadExcel(props?.tableData, context?.activeTable)}>
                        <img src="/img/export.svg" alt="Plus" style={{transform: "rotate(180deg)" }}/>
                        <span>Экспорт</span>
                    </button>
                </div>
        </div>
     );
}

export default HeaderTopPhone;