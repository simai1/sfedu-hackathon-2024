import { useContext, useEffect, useRef, useState } from "react";
import InputField from "../../../../ui/Input/Input";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import styles from "./PopUpEditWorker.module.scss";
import DataContext from "../../../../context";
import { dataListEquipment } from "../PopUpCreateWorker/data";
import { EditWorkerForId, GetWorkerOne } from "../../../../API/ApiRequest";

function PopUpEditWorker() {
    const [formData, setFormData] = useState({
        FIO: '',
        position: '',

    });
    // Имя
    // Должность
    // Адрес офиса
    
    const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log("context.selectedRows", context.selectedRows)
        GetWorkerOne(context.selectedRows[0]).then(res => {
            if(res.status === 200){
                console.log("res", res)
                setFormData({
                    FIO: res?.data?.data?.name,
                    position: res?.data?.data?.position,
                    name: res?.data?.data?.positionHuman
                })
            }
        })
    },[])
    
    const handleItemClick = (item) => {
        setFormData({ ...formData, name: item.name });
        setIsOpen(false); 
    };
    const context = useContext(DataContext);
    const sendData = () => {
        const position = dataListEquipment.find(item => item.name === formData.name);
        const positionId = position ? position.id : null;
        const formatData = {
            name : formData.FIO,
            position : positionId
        }
        EditWorkerForId(formatData, context.selectedRows[0]).then(res => {
            if(res.status === 200){
                context.getEmployeeData()
                context.setPopUp("");
            }
        })
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);
    return ( 
        <div className={styles.PopUpEditWorker}>
             <PopUpContainer width="580px" buttonCancel={true} height="280px" StandartTitle="Редактирование сотрудника" >
            <div className={styles.PopUpCreateWorker}>
                <div className={styles.PopUpCreateWorkerInner}>
                    <InputField
                        type="text" 
                        name="FIO"
                        placeholder="ФИО сотрудника" 
                        value={formData.FIO} 
                        handleChange={handleChange} 
                    />
                    <div className={styles.PopUpCreateEquipmentContainer} ref={dropdownRef}>
                        <div>
                            <div className={styles.InputList}>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onClick={() => setIsOpen(!isOpen)}
                                    onChange={handleChange} // This will not affect the input since it's read-only
                                    placeholder="Должность"
                                    className={styles.input}
                                    readOnly // Make the input read-only
                                />
                                <img src="/img/arrow.svg"
                                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    className={styles.imgArrow}
                                />
                            </div>
                        
                    
                        {isOpen && (
                            <ul className={styles.dropdown}>
                                {dataListEquipment.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        className={styles.dropdownItem}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
                    </div>
                    </div>
                   
                <div className={styles.PopUpCreateEquipmentContainerButton}>
                    <button onClick={()=> context.setPopUp("")}>Отмена</button>
                    <button onClick={()=>sendData()} >Сохранить</button>
                </div>
            </div>
        </PopUpContainer>
        </div>
     );
}

export default PopUpEditWorker;