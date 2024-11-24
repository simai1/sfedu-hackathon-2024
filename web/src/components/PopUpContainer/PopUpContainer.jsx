import { useContext } from "react";
import DataContext from "../../context";
import styles from "./PopUpContainer.module.scss";
import {ReactComponent as ClosePopUp} from "./../../assets/img/closePopUp.svg";
function PopUpContainer(props) {
    const context = useContext(DataContext);

    return (
        <div className={styles.PopUpContainer}>
            <div className={styles.PopUpContainerInner} style={{width: props?.width, height: props?.height}}>
                {props?.buttonCancel === true ? ( <div className={styles.PopUpCloseButton}>
                    <button onClick={()=>context.setPopUp("")}><ClosePopUp/></button>
                </div>):(null)
                }
                {props?.StandartTitle && (
                    <div className={styles.ContainerTitleStandart}>
                        <p className={styles.title}>{props?.StandartTitle}</p>
                    </div>
                )}
                <div className={styles.ContainerTitle}>
                    <p className={styles.title}>{props?.title}</p>
                </div>
                <div>{props?.children}</div>
            </div>
        </div>
    );
};


export default PopUpContainer;