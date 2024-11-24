import { useContext, useEffect, useState } from 'react';
import PopUpContainer from '../../../PopUpContainer/PopUpContainer';
import styles from './PopUpEditOffice.module.scss'
import DataContext from '../../../../context';
import InputField from '../../../../ui/Input/Input';
import { EditOfficeForId, GetOfficeOne } from '../../../../API/ApiRequest';

function PopUpEditOffice() {
    const [formData, setFormData] = useState({
        name: '',
        addressCity: '',
        addressOther:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const context = useContext(DataContext);
    useEffect(() => {
        console.log("context.selectedRows", context.selectedRows)
        GetOfficeOne(context.selectedRows[0]).then(res => {
            if(res.status === 200){
                console.log("res", res)
                setFormData({
                    name: res?.data?.data?.name,
                    addressCity: res?.data?.data?.city,
                    addressOther: res?.data?.data?.address,
                })
            }
        })
    },[])
   
    const sendData = () => {
        console.log("formData", formData)
        EditOfficeForId(formData, context.selectedRows[0]).then(res => {
            if(res.status === 200){
                context.getOfficeData()
                context.setPopUp("");
            }
        })
    }

    return ( 
        <div className={styles.PopUpEditOffice}>
 <PopUpContainer width="580px" buttonCancel={true} height="360px" StandartTitle="Редактирование офиса" >
            <div className={styles.PopUpCreateOffice}>
                <div className={styles.PopUpCreateOfficeInner}>
                     <InputField
                        type="text" 
                        name="name"
                        placeholder="Название офиса" 
                        value={formData.name} 
                        handleChange={handleChange} 
                    />
                        <InputField 
                        type="text" 
                        name="addressCity"
                        placeholder="Город" 
                        value={formData.addressCity} 
                        handleChange={handleChange} 
                    />
                        <InputField 
                        type="text" 
                        name="addressOther"
                        placeholder="Адрес" 
                        value={formData.addressOther} 
                        handleChange={handleChange} 
                    />
                  </div>
                <div className={styles.PopUpCreateEquipmentContainerButton}>
                    <button onClick={()=> context.setPopUp("")}>Отмена</button>
                    <button onClick={()=>sendData()}>Сохранить</button>
                </div>
            </div>
        </PopUpContainer>
        </div>
     );
}

export default PopUpEditOffice;