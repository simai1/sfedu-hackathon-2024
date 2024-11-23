import {
  addElem,
  addElemOfis,
  setMode,
  setSelectedElement,
} from "../../../store/CanvasSlice/canvas.Slice";
import { components } from "../../../store/CanvasSlice/components";
import styles from "./MenuComponent.module.scss";
import { useSelector, useDispatch } from "react-redux";

function MenuComponent() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const dispatch = useDispatch();

  const funClikElement = (id) => {
    dispatch(addElem({ id }));
  };

  const editSten = () => {
    if (canvasSlice.mode === 1) {
      dispatch(setMode({ mode: 0 }));
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
          figure: "4",
          id: Date.now().toString(),
          points: [...canvasSlice.pointsLines],
        })
      );
    } else {
      dispatch(setMode({ mode: 1 }));
    }
  };

  return (
    <div className={styles.MenuComponent}>
      <ul>
        {components.map((component) => (
          <li
            onClick={() => funClikElement(component.elemId)}
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
