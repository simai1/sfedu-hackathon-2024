import { useContext, useState } from "react";
import InputField from "../../../../ui/Input/Input";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import DataContext from "../../../../context";
import styles from "./PopUpCreateOffice.module.scss";
import { CreateOffice } from "../../../../API/ApiRequest";
function PopUpCreateOffice() {
  const [formData, setFormData] = useState({
    name: "",
    addressCity: "",
    addressOther: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const context = useContext(DataContext);
  const sendData = () => {
    console.log("formData", formData);
    CreateOffice(formData).then((res) => {
      if (res.status === 200) {
        context.getOfficeData();
        context.setPopUp("");
      }
    });
  };
  return (
    <PopUpContainer
      width="580px"
      buttonCancel={true}
      height="360px"
      StandartTitle="Новый офис"
    >
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
          <button onClick={() => context.setPopUp("")}>Отмена</button>
          <button onClick={() => sendData()}>Добавить</button>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default PopUpCreateOffice;
