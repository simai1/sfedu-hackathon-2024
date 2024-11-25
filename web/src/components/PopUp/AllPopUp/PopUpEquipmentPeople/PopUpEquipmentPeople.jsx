import { useContext, useEffect, useState } from "react";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import styles from "./PopUpEquipmentPeople.module.scss";
import { GetEquipment, GetProfileOne, UpdateEquipment } from "../../../../API/ApiRequest";
import DataContext from "../../../../context";

function PopUpEquipmentPeople(props) {
    const [userData, setUserData] = useState(null);
    const context = useContext(DataContext);
    const [openList, SetOpenList] = useState(false);
    const [listEquipment, setListEquipment] = useState([]);
    useEffect(() => {
        getDatauser();
    }, [context?.getProfileId]); // Added dependency to useEffect

    const getDatauser = () => {
        GetProfileOne(context?.getProfileId).then((res) => {
            if (res.status === 200) {
                setUserData(res.data.data);
            }
        });
    }

    const AddEquipment = () => {
        GetEquipment().then((res) => {
            if (res.status === 200) {
                console.log(res.data.data)
                setListEquipment(res.data.data);
            }
        })
        SetOpenList(true)
    }

    const funClikElementEquepment = (id) => {
        console.log("id", id);
        const data = {
            equipmentId: id,
        }
        UpdateEquipment(data, context?.getProfileId).then((res) => {
            if (res.status === 200) {
                SetOpenList(false)
                console.log(res.data.data)
                getDatauser();
            }
        })
    }

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
                                        <li>{equipment.name}/ {equipment.inventoryNumber}</li> {/* Display equipment name */}
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.PopUpEquipmentPeopleNoteData}>
                            <p>За сотрудником нет закрепленного<br></br> оборудования.</p>
                        </div>
                    )}
                    {
                        openList && (
                            <div className={styles.PopUpAddEquipment}>
                                <ul>
                                    {listEquipment.map((equipment, index) => (
                                        <li onClick={() => funClikElementEquepment(equipment.id)} key={index}>{equipment.name}</li>
                                        ))}
                                </ul>
                                
                            </div>
                        )
                    }
                </div>
                <div className={styles.buttonCont}><button onClick={()=> AddEquipment() }>Добавить оборудование</button></div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpEquipmentPeople;