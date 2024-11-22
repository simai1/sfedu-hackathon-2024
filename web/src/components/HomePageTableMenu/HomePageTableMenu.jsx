import styles from "./HomePageTableMenu.module.scss";
import { ReactComponent as Plus } from "./../../assets/img/Plus.svg";
function HomePageTableMenu() {

    return ( 
        <div className={styles.HomePageTableMenu}>
            <div className={styles.Search}>
                <p>Перечень</p>
                <img src="/img/loop.svg"/>
            </div>
            <div  className={styles.HomePageButtonNewEmployee}>
                <button><Plus/>Добавить оборудование</button>
            </div>

        </div>
     );
}

export default HomePageTableMenu;