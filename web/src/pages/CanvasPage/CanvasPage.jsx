import React from "react";
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
import { useContext, useEffect, useState } from "react";
import {
  apiAddElemConvas,
  setElem,
  setSearch,
  setSelectedElement,
} from "../../store/CanvasSlice/canvas.Slice";
import { setOffice } from "../../store/basicSlice/basic.Slice";
import DataContext from "../../context";
import PopUpCreateEquipment from "../../components/PopUp/EquipmentPopUp/PopUpCreateEquipment/PopUpCreateEquipment";
import PopUpCreateOffice from "../../components/PopUp/OffisePopUp/PopUpCreateOffice/PopUpCreateOffice";
import { useNavigate } from "react-router-dom";

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
    console.log("data", data)

    refreshCanvas(equipmentSlice.selectedFloor).then((res) => {
      if (res?.status === 200) {
        GetOfficeAll().then((resp) => {
          if (resp?.status === 200) {
            dispatch(setOffice({ data: resp.data.data }));
            apiSaveConvas(data, equipmentSlice.selectedFloor).then((res) => {
              console.log(res);
            });
          }
        });
      }
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

  const [searchElems, setSearchElems] = React.useState([]);

  useEffect(() => {
    setSearchElems([
      ...canvasSlice.elements.filter((elem) =>
        elem.name.toLowerCase().includes(canvasSlice.serch?.toLowerCase())
      ),
    ]);
    console.log("searchElems", searchElems);
  }, [canvasSlice.serch]);

  const nabigate = useNavigate();

  return (
    <div className={styles.CanvasPage}>
      <div className={styles.HomePageProfileClicker}>
        <HomePageProfileClicker />
      </div>
      <MenuComponent />
      <Konva />
      <OfficeHead />
      <RigthMenu />
      <input
        type="tetx"
        placeholder="Поиск"
        className={styles.input}
        onChange={(e) => {
          dispatch(setSearch({ text: e.target.value }));
        }}
        value={canvasSlice.serch}
      />
      {searchElems.length > 0 && canvasSlice.serch && (
        <div className={styles.ser}>
          <ul>
            {searchElems.map((el) => (
              <li
                onClick={() => {
                  dispatch(setSelectedElement({ id: el.id }));
                  dispatch(setSearch({ text: "" }));
                  setSearchElems([]);
                }}
              >
                {el.name}{" "}
                {
                  equipmentSlice.equipment.find(
                    (ele) => ele.id === el?.idEquipment
                  )?.inventoryNumber
                }{" "}
                {
                  equipmentSlice.worker.find(
                    (ele) => ele.id === el?.idEquipment
                  )?.name
                }
              </li>
            ))}
          </ul>
        </div>
      )}

      {context.popUp === "PopUpCreateOffice" && <PopUpCreateOffice />}
      <div className={styles.Save}>
        <button onClick={refrechConvas}>
          <img src="/img/delete.svg" alt="1" />
          Сбросить
        </button>

        <button onClick={funSaveConvas}>Сохранить</button>
      </div>
      <div className={styles.Back} onClick={() => nabigate("/homePage")}>
        <img src="./img/iii.svg" alt="img" />
        <p>На главную</p>
      </div>
    </div>
  );
}

export default CanvasPage;
