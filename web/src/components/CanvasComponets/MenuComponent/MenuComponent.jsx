import { addElem } from "../../../store/CanvasSlice/canvas.Slice";
import { components } from "../../../store/CanvasSlice/components";
import styles from "./MenuComponent.module.scss";
import { useSelector, useDispatch } from "react-redux";

function MenuComponent() {
  //   const canvasSlice = useSelector((state) => state.CanvasSlice);
  const dispatch = useDispatch();

  const funClikElement = (id) => {
    dispatch(addElem({ id }));
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
      </ul>
    </div>
  );
}

export default MenuComponent;
