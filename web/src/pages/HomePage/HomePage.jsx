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
import { dataListEquipment } from "./data";
import HeaderTopPhone from "../../components/HeaderTopPhone/HeaderTopPhone";
import PhoneDataVizulizer from "../../components/PhoneDataVizulizer/PhoneDataVizulizer";
import PopUpEditOffice from "../../components/PopUp/OffisePopUp/PopUpEditOffice/PopUpEditOffice";
import PopUpEditWorker from "../../components/PopUp/StaffPopUp/PopUpEditWorker/PopUpEditWorker";

function HomePage() {
  const context = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.getTableData();
  }, []);

  useEffect(() => {
    context.setSelectedRows([]);
    context.getTableData();
  }, [
    context.valueNameStaff,
    context.valueNameOffise,
    context.valueNameEquipment,
  ]);

  const filterData = (data) => {
    let value;
    if (context.activeTable === "Equipment") {
      value = context.valueNameEquipment;
    } else if (context.activeTable === "Staff") {
      value = context.valueNameStaff;
    } else {
      value = context.valueNameOffise;
    }

    if (!value) {
      return data;
    } else {
      switch (context.activeTable) {
        case "Equipment":
          const equipment = dataListEquipment.find(
            (item) => item.name === value
          );
          const typeId = equipment ? equipment.id : null;
          return data.filter((item) => item.type === typeId);
        case "Staff":
          return data.filter((item) =>
            item?.building?.toLowerCase().includes(value.toLowerCase())
          );
        case "office":
          return data.filter((item) =>
            item?.address?.toLowerCase().includes(value.toLowerCase())
          );
        default:
          return data;
      }
    }
  };

  return (
    <div className={styles.HomePageContainer}>
      <header>
        <div className={styles.HomePageHeaderPc}>
          <HomePageProfileClicker />
          <HomePageTopMenu />
          <div className={styles.EditLink} onClick={() => navigate("/konva")}>
            <div className={styles.EditLinkInner}>
              <p>Перейти в конструктор</p>
              <img src="/img/linkArrow.svg" alt="Link Arrow" />
            </div>
          </div>
        </div>
        <div className={styles.HomePageHeaderMobile}>
          <HomePageProfileClicker />
        </div>
      </header>

      <main>
        <section className={styles.HomePageTableSectionPc}>
          <HomePageTableMenu tableData={filterData(context.tableBody)} />
          <div className={styles.HomePageTable}>
            <UniversalTable
              tableBody={filterData(context.tableBody)}
              tableHeader={context.tableHeader}
            />
          </div>
        </section>
        <section className={styles.HomePageTableSectionMobile}>
          <HeaderTopPhone tableData={filterData(context.tableBody)} />
          <PhoneDataVizulizer
            tableBody={filterData(context.tableBody)}
            tableHeader={context.tableHeader}
          />
        </section>
        
      </main>

      <FooterHomePageComp />
      {context.popUp === "PopUpEquipmentPeople" && <PopUpEquipmentPeople />}
      {context.popUp === "PopUpDeleteStaff" && <PopUpDeleteStaff />}
      {context.popUp === "PopUpDeleteOffice" && <PopUpDeleteOffice />}
      {context.popUp === "PopUpDeleteEqupment" && <PopUpDeleteEqupment />}
      {context.popUp === "PopUpCreateEquipment" && <PopUpCreateEquipment />}
      {context.popUp === "PopUpCreateOffice" && <PopUpCreateOffice />}
      {context.popUp === "PopUpCreateWorker" && <PopUpCreateWorker />}
      {context.popUp === "PopUpEditOffice" && <PopUpEditOffice />}
      {context.popUp === "PopUpEditWorker" && <PopUpEditWorker />}
    </div>
  );
}

export default HomePage;
