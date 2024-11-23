import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import styles from "./HomePage.module.scss";
import HomePageTopMenu from "../../ui/HomePageTopMenu/HomePageTopMenu";
import HomePageTableMenu from "../../components/HomePageTableMenu/HomePageTableMenu";
import UniversalTable from "../../components/UniversalTable/UniversalTable";
import FooterHomePageComp from "../../components/FooterHomePage/FooterHomePage";
import PopUpEquipmentPeople from "../../components/PopUp/PopUpEquipmentPeople/PopUpEquipmentPeople";

function HomePage() {
  const context = useContext(DataContext);
  const navigate = useNavigate();

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
            tableBody={context.tableBody} 
            tableHeader={context.tableHeader} 
          />
        </div>
      </main>
      <FooterHomePageComp />
      {context.popUp === "PopUpEquipmentPeople" && <PopUpEquipmentPeople />}
    </div>
  );
}

export default HomePage;