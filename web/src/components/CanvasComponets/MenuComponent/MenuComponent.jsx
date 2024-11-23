import { useEffect } from "react";
import {
  addElem,
  addElemOfis,
  setMode,
  setSelectedElement,
} from "../../../store/CanvasSlice/canvas.Slice";
import { components } from "../../../store/CanvasSlice/components";
import styles from "./MenuComponent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetEquipment } from "../../../API/ApiRequest";
import { setEquipment } from "../../../store/basicSlice/basic.Slice";

function MenuComponent() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const dispatch = useDispatch();

  const funClikElement = (type, id) => {
    dispatch(addElem({ id: type + "", idEquipment: id }));
  };

  useEffect(() => {
    GetEquipment().then((resp) => {
      if (resp?.status === 200) {
        dispatch(setEquipment({ data: resp.data.data }));
      }
    });
  }, []);

  const editSten = () => {
    if (canvasSlice.mode === 1) {
      dispatch(setMode({ mode: 0 }));
      const groupedPoints = [];
      //   const mass = [...canvasSlice.pointsLines];
      //   for (let i = 0; i < mass.length; i++) {
      //     let m = [];
      //     m.push([mass[i], mass[i + 1], mass[i + 2], mass[i + 3]]);
      //   }

      for (let i = 0; i < canvasSlice.pointsLines.length - 2; i += 2) {
        const startPoint = canvasSlice.pointsLines[i]; // Начало текущей линии
        const endPoint = canvasSlice.pointsLines[i + 1]; // Конец текущей линии
        const nextStartPoint = canvasSlice.pointsLines[i + 2]; // Начало следующей линии
        // Создаем группу из четырех точек: (начало, конец текущей, начало следующей, конец следующей)
        const group = [
          startPoint,
          endPoint,
          nextStartPoint,
          canvasSlice.pointsLines[i + 3],
        ];
        groupedPoints.push(group);
      }

      console.log("groupedPoints", groupedPoints);
      groupedPoints.forEach((group, index) => {
        dispatch(
          addElemOfis({
            x: 100,
            y: 10,
            fill: "#313131",
            elemId: "6",
            name: "Кабинет",
            opacity: 0.5,
            zIndex: 100,
            draggable: true,
            figure: "2",
            id: Date.now().toString() + index,
            points: group,
          })
        );
      });

      //   dispatch(
      //     addElemOfis({
      //       x: 100,
      //       y: 10,
      //       fill: "#313131",
      //       elemId: "6",
      //       name: "Кабинет",
      //       opacity: 0.5,
      //       zIndex: 100,
      //       draggable: true,
      //       figure: "4",
      //       id: Date.now().toString(),
      //       points: [...canvasSlice.pointsLines],
      //     })
      //   );
    } else {
      dispatch(setMode({ mode: 1 }));
    }
  };

  return (
    <div className={styles.MenuComponent}>
      <ul>
        {equipmentSlice.equipment.map((component) => (
          <li
            onClick={() => funClikElement(component.type, component.id)}
            key={component.elemId}
          >
            {component.name}
          </li>
        ))}
        <li onClick={() => editSten()}>
          {canvasSlice.mode === 1 ? "Сохранить" : "Рисовать стены"}
        </li>
      </ul>
    </div>
  );
}

export default MenuComponent;
