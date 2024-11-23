import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import styles from "./PopUpEquipmentPeople.module.scss";
function PopUpEquipmentPeople() {
    return ( 
        <PopUpContainer title="Смирнов Александр Иванович" width="640px" buttonCancel={true}>
                <div className={styles.PopUpEquipmentPeopleContainer}>
                    <div className={styles.PopUpEquipmentPeopleContainerInner}>
                        <div className={styles.PopUpEquipmentPeople}>
                            <div>
                                <img src="/img/monitor.svg"/>
                            </div>
                            <div>
                                <ul>
                                    <li>Dell UltraSharp</li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className={styles.PopUpEquipmentPeople}>
                            <div>
                                <img src="/img/mouse.svg"/>
                            </div>
                            <div>
                                <ul>
                                    <li>PCD-23</li>
                                </ul>
                            </div>
                        </div> */}
                        <div className={styles.PopUpEquipmentPeople}>
                            <div>
                                <img src="/img/clava.svg"/>
                            </div>
                            <div>
                                <ul>
                                    <li>Panasonic MP-5</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.PopUpEquipmentPeople}>
                            <div>
                                <img src="/img/notebook.svg"/>
                            </div>
                            <div>
                                <ul>
                                    <li>Macbook Pro 16</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </PopUpContainer>
     );
}

export default PopUpEquipmentPeople;