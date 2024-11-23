import { useContext } from "react";
import PopUpContainer from "../../PopUpContainer/PopUpContainer";
import styles from "./PopUpDeleteEqupment.module.scss";
import DataContext from "../../../context";
function PopUpDeleteEqupment() {
    const context = useContext(DataContext);
    return ( 
        <PopUpContainer width="640px" buttonCancel="false" height="280px">
            <div className={styles.PopUpDeleteContainer}>
                <div className={styles.PopUpDeleteTitle}><p>Удалить выбранные оборудования?</p></div>
                <div>
                    <div className={styles.PopUpDeleteEqupmentContainerButton}>
                        <button onClick={()=>context.setPopUp("")}>Отмена</button>
                        <button>Удалить</button>
                    </div>
                </div>
            </div>
        </PopUpContainer>
     );
}

export default PopUpDeleteEqupment;