import styles from "./PopUpCreateEquipment.module.scss";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import { useState, useEffect, useRef, useContext } from "react";
import InputField from "../../../../ui/Input/Input";
import DataContext from "../../../../context";
import { CreateEquipment } from "../../../../API/ApiRequest";

function PopUpCreateEquipment() {
    const [formData, setFormData] = useState({
        nameEquipment: '',
        description: '',
        conditionName:'',
        cost: '',
    });
    const context = useContext(DataContext);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference for the dropdown
    const [isOpenCond, setIsOpenCond] = useState(false);
    const dataListEquipment = [
        { id: 1, name: "Ноутбук" },
        { id: 2, name: "Стол" },
        { id: 3, name: "Лампа" },
        { id: 4, name: "Монитор" },
        { id: 5, name: "Диван" },
        { id: 6, name: "Принтер" },
        { id: 7, name: "Компьютер" },
        { id: 8, name: "Кофемашина" },
        { id: 9, name: "Клавиатура" },
        { id: 10, name: "Стул" },
    ]; 

    const dataListCondition = [
        { id: 1, name: "Отличное" },
        { id: 2, name: "Сломано" },
    ]
    const getLink = () => {
        switch (formData.name) {
            case "Ноутбук":
                return "/img/notebook.svg";
            case "Стол":
                return "/img/table.svg";
            case "Лампа":
                return "/img/lamp.svg";
            case "Монитор":
                return "/img/monitor.svg";
            case "Диван":
                return "/img/divan.svg";
            case "Принтер":
                return "/img/printer.svg";
            case "Компьютер":
                return "/img/system.svg";
            case "Кофемашина":
                return "/img/cofeWorker.svg";
            case "Клавиатура":
                return "/img/clava.svg";
            case "Стул":
                return "/img/stul.svg";
            default:
        }
    }
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (error) {
            setError('');
        }
    };
    const handleInputClickCond = () => {
        setIsOpenCond(!isOpenCond); // Toggle the dropdown on input click
    };

    const handleInputClick = () => {
        setIsOpen(!isOpen); // Toggle the dropdown on input click
    };

    const handleItemClick = (item) => {
        setFormData({ ...formData, name: item.name });
        setIsOpen(false); // Close the dropdown after selection
    };
    const handleItemClickCond = (item) => {
        setFormData({ ...formData, conditionName: item.name });
        setIsOpenCond(false); // Close the dropdown after selection
    };
    const sendData = () => {
        const equipment = dataListEquipment.find(item => item.name === formData.name);
        const equipmentId = equipment ? equipment.id : null;
        
        // Сопоставление id для condition
        const condition = dataListCondition.find(item => item.name === formData.conditionName);
        const conditionId = condition ? condition.id : null;
        
        // Формирование нового объекта
        const formattedData = {
            name: formData.name,
            description: formData.description,
            condition: conditionId,
            type: equipmentId,
            cost: parseInt(formData.cost, 10) // Преобразуем строку в число
        };
        console.log("formattedData", formattedData);
        CreateEquipment(formattedData).then(res => {
            if(res.status === 200){
                context.getEquuipmentData()
                context.setPopUp(false);
            }
        });
    }
    // Close dropdown when clicking outside
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
        <PopUpContainer width="640px" buttonCancel={true} height="600px" StandartTitle="Новое оборудование">
            <div className={styles.PopUpCreateEquipment}>
                <div ref={dropdownRef}>
                <div className={styles.PopUpCreateEquipmentList}>
                    <div className={styles.circle}>
                        <img src={getLink()}/>
                    </div>
                    <div>
                        <input 
                            name="name"
                            value={formData.name}
                            onClick={handleInputClick}
                            onChange={handleChange} // This will not affect the input since it's read-only
                            placeholder="Название"
                            className={styles.input}
                            readOnly // Make the input read-only
                        />
                        <img src="/img/arrow.svg"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            className={styles.imgArrow}
                        />
                    </div>
                     
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
                    <div className={styles.InputFieldContainer}>
                    <InputField 
                       type="text" 
                       name="nameEquipment"
                       placeholder="Название" 
                       value={formData.nameEquipment} 
                       handleChange={handleChange} 
                    />
                       <InputField 
                       type="number" 
                       name="cost"
                       placeholder="Цена" 
                       value={formData.cost} 
                       handleChange={handleChange} 
                    />
                     <div>
                     <div className={styles.dropdownCons}>
                            <input 
                                name="conditionName"
                                value={formData.conditionName}
                                onClick={handleInputClickCond}
                                onChange={handleChange} // This will not affect the input since it's read-only
                                placeholder="Состояние"
                                className={styles.input}
                                readOnly // Make the input read-only
                            />
                            <img src="/img/arrow.svg"
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                className={styles.imgArrowCond}
                            />
                            {isOpenCond && (
                                <ul className={styles.dropdownConsInner}>
                                    {dataListCondition.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleItemClickCond(item)}
                                            className={styles.dropdownItem}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                       <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Описание"
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.PopUpCreateEquipmentContainerButton}>
                        <button onClick={()=> context.setPopUp("")}>Отмена</button>
                        <button onClick={()=>sendData()} >Добавить</button>
                    </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </PopUpContainer>
    );
}

export default PopUpCreateEquipment;