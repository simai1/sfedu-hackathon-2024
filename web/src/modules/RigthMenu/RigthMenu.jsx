import { useDispatch, useSelector } from "react-redux";
import styles from "./RigthMenu.module.scss";
import { useEffect, useState } from "react";
import { deleteElem, setDraggable } from "../../store/CanvasSlice/canvas.Slice";

function RigthMenu() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const dispatch = useDispatch();
  const [element, setElement] = useState(
    canvasSlice.elements.find((elem) => elem.id === canvasSlice.selectedElement)
  );

  useEffect(() => {
    setElement(
      canvasSlice.elements.find(
        (elem) => elem.id === canvasSlice.selectedElement
      )
    );
  }, [canvasSlice]);

  const deleteElement = (id) => {
    dispatch(deleteElem({ id }));
  };

  const onBloked = () => {
    dispatch(setDraggable({ id: element.id }));
  };

  return (
    <div className={styles.RigthMenu}>
      {element?.id && (
        <>
          <button onClick={() => deleteElement(element.id)}>Удалить</button>
          <button onClick={() => onBloked(element.id)}>
            {!element.draggable ? "Разблокировать" : "Заблокировать"}
          </button>
        </>
      )}

      <div>
        <p>Name: {element?.name}</p>
        <p>X: {element?.x?.toFixed(2)}</p>
        <p>Y: {element?.y?.toFixed(2)}</p>
        <p>Width: {element?.width?.toFixed(2)}</p>
        <p>Height: {element?.height?.toFixed(2)}</p>
        <p>Opacity: {element?.opacity?.toFixed(2)}</p>
        <p>Fill: {element?.fill}</p>
      </div>
    </div>
  );
}

export default RigthMenu;
