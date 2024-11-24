import { useDispatch, useSelector } from "react-redux";
import { apiGetConvas, apiSaveConvas } from "../../API/ApiRequest";
import MenuComponent from "../../components/CanvasComponets/MenuComponent/MenuComponent";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import OfficeHead from "../../components/OfficeHead/OfficeHead";
import Konva from "../../modules/Konva/Konva";
import RigthMenu from "../../modules/RigthMenu/RigthMenu";
import styles from "./CanvasPage.module.scss";
import { useEffect } from "react";
import { apiAddElemConvas } from "../../store/CanvasSlice/canvas.Slice";

function CanvasPage() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const dispatch = useDispatch();
  //! получаем елементы конваса с бэка и записываем в редукс
  useEffect(() => {
    apiGetConvas(equipmentSlice.selectedFloor).then((res) => {
      console.log("res", res);
      if (res?.status === 200) {
        dispatch(apiAddElemConvas({ data: res.data?.data }));
      }
    });
  }, []);

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
