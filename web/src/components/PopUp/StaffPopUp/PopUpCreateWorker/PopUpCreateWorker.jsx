import { useContext, useState } from "react";
import InputField from "../../../../ui/Input/Input";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import DataContext from "../../../../context";
import styles from "./PopUpCreateWorker.module.scss";
import { CreateOffice } from "../../../../API/ApiRequest";

function PopUpCreateWorker() {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const context = useContext(DataContext);
    const sendData = () => {
        console.log("formData", formData)
        CreateOffice(formData).then(res => {
            if(res.status === 200){
                context.getOfficeData()
                context.setPopUp("");
            }
        })
    }
    return ( 
        <PopUpContainer width="580px" buttonCancel={true} height="280px" StandartTitle="Новый офис" >
            <div className={styles.PopUpCreateWorker}>
                <div className={styles.PopUpCreateWorkerInner}>
                    <InputField 
                        type="text" 
                        name="name"
                        placeholder="ФИО сотрудника" 
                        value={formData.name} 
                        handleChange={handleChange} 
                    />
                        <InputField 
                        type="text" 
                        name="position"
                        placeholder="Должность" 
                        value={formData.position} 
                        handleChange={handleChange} 
                    />
                </div>
                   
                <div className={styles.PopUpCreateEquipmentContainerButton}>
                    <button onClick={()=> context.setPopUp("")}>Отмена</button>
                    <button onClick={()=>sendData()} >Добавить</button>
                </div>
            </div>
        </PopUpContainer>
     );
}

export default PopUpCreateWorker;