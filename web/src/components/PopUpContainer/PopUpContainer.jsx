import { useContext } from "react";
import DataContext from "../../context";
import styles from "./PopUpContainer.module.scss";
import {ReactComponent as ClosePopUp} from "./../../assets/img/closePopUp.svg";
function PopUpContainer(props) {
    const context = useContext(DataContext);

    return (
        <div className={styles.PopUpContainer}>
            <div className={styles.PopUpContainerInner} style={{width: props?.width}}>
                <div className={styles.PopUpCloseButton}>
                    <button onClick={()=>context.setPopUp("")}><ClosePopUp/></button>
                </div>
                <div className={styles.ContainerTitle}>
                    <p className={styles.title}>{props?.title}</p>
                </div>
                <div>{props?.children}</div>
            </div>
        </div>
    );
};


export default PopUpContainer;