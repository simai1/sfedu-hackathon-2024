import { useDispatch, useSelector } from "react-redux";
import {
  apiGetConvas,
  apiSaveConvas,
  GetOfficeAll,
  refreshCanvas,
} from "../../API/ApiRequest";
import MenuComponent from "../../components/CanvasComponets/MenuComponent/MenuComponent";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import OfficeHead from "../../components/OfficeHead/OfficeHead";
import Konva from "../../modules/Konva/Konva";
import RigthMenu from "../../modules/RigthMenu/RigthMenu";
import styles from "./CanvasPage.module.scss";
import { useContext, useEffect } from "react";
import {
  apiAddElemConvas,
  setElem,
} from "../../store/CanvasSlice/canvas.Slice";
import { setOffice } from "../../store/basicSlice/basic.Slice";
import DataContext from "../../context";
import PopUpCreateEquipment from "../../components/PopUp/EquipmentPopUp/PopUpCreateEquipment/PopUpCreateEquipment";
import PopUpCreateOffice from "../../components/PopUp/OffisePopUp/PopUpCreateOffice/PopUpCreateOffice";

function CanvasPage() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const context = useContext(DataContext);
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

  const refrechConvas = () => {
    refreshCanvas(equipmentSlice.selectedFloor).then((res) => {
      if (res?.status === 200) {
        GetOfficeAll().then((resp) => {
          if (resp?.status === 200) {
            dispatch(setOffice({ data: resp.data.data }));
            dispatch(setElem({ mass: [] }));
          }
        });
      }
    });
  };

  return (
    <div className={styles.CanvasPage}>
      <div className={styles.HomePageProfileClicker}>
        <HomePageProfileClicker />
      </div>
      <MenuComponent />
      <Konva />
      <OfficeHead />
      <RigthMenu />
      {context.popUp === "PopUpCreateOffice" && <PopUpCreateOffice />}
      <div className={styles.Save}>
        <button onClick={refrechConvas}>
          <img src="/img/delete.svg" alt="1" />
          Сбросить
        </button>

        <button onClick={funSaveConvas}>Сохранить</button>
      </div>
    </div>
  );
}

export default CanvasPage;
