import { apiSaveConvas } from "../../API/ApiRequest";
import MenuComponent from "../../components/CanvasComponets/MenuComponent/MenuComponent";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import OfficeHead from "../../components/OfficeHead/OfficeHead";
import Konva from "../../modules/Konva/Konva";
import RigthMenu from "../../modules/RigthMenu/RigthMenu";
import styles from "./CanvasPage.module.scss";

function CanvasPage() {
  const funSaveConvas = () => {
    apiSaveConvas().then((res) => {
      console.log(res);
    });
  };

  return (
    <div className={styles.CanvasPage}>
      <div className={styles.HomePageProfileClicker}>
        <HomePageProfileClicker />
        <div className={styles.Save}>
          <button onClick={funSaveConvas}>Сохранить</button>
        </div>
      </div>
      <MenuComponent />
      <Konva />
      <OfficeHead />
      <RigthMenu />
    </div>
  );
}

export default CanvasPage;
