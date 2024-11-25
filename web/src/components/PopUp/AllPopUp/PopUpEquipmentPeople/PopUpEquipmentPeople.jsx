import { useContext, useEffect, useRef, useState } from "react";
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
            console.log(res.data.data);
            // Ensure userData.equipments is an array and access the id correctly
            const userEquipmentIds = userData?.equipments?.map(equipment => equipment.id) || [];
            console.log("userData?.equipments", userData?.equipments);
            
            // Filter out the user's equipment from the fetched data
            const filterData = res.data.data.filter((el) => !userEquipmentIds.includes(el.id));
            console.log("filterData", filterData);
            
            setListEquipment(filterData);
        }
    });
    SetOpenList(true);
};

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

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                SetOpenList(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <PopUpContainer title={userData?.name} width="640px" buttonCancel={true}>
            <div className={styles.PopUpEquipmentPeopleContainer}>
                <div className={styles.PopUpEquipmentPeopleContainerInner}>
                    {userData?.equipments && userData.equipments.length > 0 ? ( // Fixed length check
                        userData.equipments.map((equipment, index) => ( // Dynamically render equipment
                            <div className={styles.PopUpEquipmentPeople} key={index}>
                                <div>
                                    <img src={context.getLink(equipment.name)} alt={equipment.name} /> {/* Use a default image if none provided */}
                                </div>
                                <div>
                                    <ul>
                                        <li>{equipment.name} / {equipment.inventoryNumber.slice(0, 3)}</li> {/* Display equipment name */}
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
                            <div className={styles.PopUpAddEquipment} ref={dropdownRef}>
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