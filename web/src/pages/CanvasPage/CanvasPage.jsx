import { useSelector } from "react-redux";
import { apiSaveConvas } from "../../API/ApiRequest";
import MenuComponent from "../../components/CanvasComponets/MenuComponent/MenuComponent";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import OfficeHead from "../../components/OfficeHead/OfficeHead";
import Konva from "../../modules/Konva/Konva";
import RigthMenu from "../../modules/RigthMenu/RigthMenu";
import styles from "./CanvasPage.module.scss";

function CanvasPage() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);

  const funSaveConvas = () => {
    const d = canvasSlice.elements;
    const eq = d.filter((elem) => elem.type === "equipments");
    let eqmass = [];
    eq?.map((el) => {
      eqmass.push({
        id: el.idEquipment,
        data: el,
      });
    });
    console.log("eqmass", eq);

    const em = d.filter((elem) => elem.type === "employees");
    let emmass = [];
    em?.map((el) => {
      emmass.push({
        id: el.idEquipment,
        data: {
          ...el,
        },
      });
    });

    const ba = d.filter((elem) => elem.type === "background");
    let bamass = [];
    ba?.map((el) => {
      bamass.push({
        id: el.id,
        data: {
          ...el,
        },
      });
    });
    const data = {
      equipments: eqmass,
      employees: emmass,
      background: bamass,
    };
    apiSaveConvas(data, equipmentSlice.selectedFloor).then((res) => {
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
