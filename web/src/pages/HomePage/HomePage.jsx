import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import styles from "./HomePage.module.scss";
import HomePageTopMenu from "../../ui/HomePageTopMenu/HomePageTopMenu";
import HomePageTableMenu from "../../components/HomePageTableMenu/HomePageTableMenu";
import UniversalTable from "../../components/UniversalTable/UniversalTable";
import FooterHomePageComp from "../../components/FooterHomePage/FooterHomePage";
import PopUpEquipmentPeople from "../../components/PopUp/AllPopUp/PopUpEquipmentPeople/PopUpEquipmentPeople";
import PopUpDeleteStaff from "../../components/PopUp/StaffPopUp/PopUpDeleteStaff/PopUpDeleteStaff";
import PopUpDeleteOffice from "../../components/PopUp/OffisePopUp/PopUpDeleteOffice/PopUpDeleteOffice";
import PopUpDeleteEqupment from "../../components/PopUp/EquipmentPopUp/PopUpDeleteEquipment/PopUpDeleteEqupment";
import PopUpCreateEquipment from "../../components/PopUp/EquipmentPopUp/PopUpCreateEquipment/PopUpCreateEquipment";
import { GetEquipment } from "../../API/ApiRequest";
import { filterData } from "../../function";
import PopUpCreateOffice from "../../components/PopUp/OffisePopUp/PopUpCreateOffice/PopUpCreateOffice";
import PopUpCreateWorker from "../../components/PopUp/StaffPopUp/PopUpCreateWorker/PopUpCreateWorker";

function HomePage() {
  const context = useContext(DataContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    context.getEquuipmentData()
   
  },[context.valueNameStaff, context.valueNameOffise, context.valueNameEquipment])

  const filterData = (data) => {
    let value;
    if (context.activeTable === "Equipment") {
      value = context.valueNameEquipment;
    } else if (context.activeTable === "Staff") {
      value = context.valueNameStaff;
    } else {
      value = context.valueNameOffise;
    }

    if(!value){
      return data
    }

    const dataListEquipment = [
      { id: 1, name: "Ноутбуки" },
      { id: 2, name: "Столы" },
      { id: 3, name: "Лампы" },
      { id: 4, name: "Мониторы" },
      { id: 5, name: "Диваны" },
      { id: 6, name: "Принтеры" },
      { id: 7, name: "Компьютеры" },
      { id: 8, name: "Кофемашины" },
      { id: 9, name: "Клавиатуры" },
      { id: 10, name: "Стулья" },
    ]; 

    // Сопоставление типа по названию
    const equipment = dataListEquipment.find(item => item.name === value);
    const typeId = equipment ? equipment.id : null;
    console.log("typeId", typeId)
    console.log("data", data)
    console.log("value", value)
    // Фильтрация данных по указанному столбцу
    console.log(data.filter(item => item.type === typeId))
    return data.filter(item => item.type === typeId);
  };

  return (
    <div className={styles.HomePageContainer}>
      <header>
        <HomePageProfileClicker />
        <HomePageTopMenu />
        <div className={styles.EditLink} onClick={() => navigate("/konva")}>
          <div className={styles.EditLinkInner}>
            <p>Перейти в конструктор</p>
            <img src="/img/linkArrow.svg" alt="Link Arrow" />
          </div>
        </div>
      </header>
      <main>
        <HomePageTableMenu />
        <div className={styles.HomePageTable}>
          <UniversalTable 
            tableBody={filterData(context.tableBody)} 
            tableHeader={context.tableHeader} 
          />
        </div>
      </main>
      <FooterHomePageComp />
      {context.popUp === "PopUpEquipmentPeople" && <PopUpEquipmentPeople />}
      {context.popUp === "PopUpDeleteStaff" && <PopUpDeleteStaff />}
      {context.popUp === "PopUpDeleteOffice" && <PopUpDeleteOffice />}
      {context.popUp === "PopUpDeleteEqupment" && <PopUpDeleteEqupment/>}
      {context.popUp === "PopUpCreateEquipment" && <PopUpCreateEquipment />}
      {context.popUp === "PopUpCreateOffice" && <PopUpCreateOffice />}
      {context.popUp === "PopUpCreateWorker" && <PopUpCreateWorker />}
    </div>
  );
}

export default HomePage;