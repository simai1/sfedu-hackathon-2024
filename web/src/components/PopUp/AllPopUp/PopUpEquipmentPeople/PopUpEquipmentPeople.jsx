import { useContext, useEffect, useState } from "react";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import styles from "./PopUpEquipmentPeople.module.scss";
import { GetProfileOne } from "../../../../API/ApiRequest";
import DataContext from "../../../../context";

function PopUpEquipmentPeople(props) {
    const [userData, setUserData] = useState(null);
    const context = useContext(DataContext);

    useEffect(() => {
        GetProfileOne(context?.getProfileId).then((res) => {
            if (res.status === 200) {
                setUserData(res.data.data);
            }
        });
    }, [context?.getProfileId]); // Added dependency to useEffect

    return (
        <PopUpContainer title={userData?.name} width="640px" buttonCancel={true}>
            <div className={styles.PopUpEquipmentPeopleContainer}>
                <div className={styles.PopUpEquipmentPeopleContainerInner}>
                    {userData?.equipments && userData.equipments.length > 0 ? ( // Fixed length check
                        userData.equipments.map((equipment, index) => ( // Dynamically render equipment
                            <div className={styles.PopUpEquipmentPeople} key={index}>
                                <div>
                                    <img src={equipment.imageUrl || "/img/notebook.svg"} alt={equipment.name} /> {/* Use a default image if none provided */}
                                </div>
                                <div>
                                    <ul>
                                        <li>{equipment.name}</li> {/* Display equipment name */}
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.PopUpEquipmentPeopleNoteData}>
                            <p>За сотрудником нет закрепленного<br></br> оборудования.</p>
                        </div>
                    )}
                </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpEquipmentPeople;