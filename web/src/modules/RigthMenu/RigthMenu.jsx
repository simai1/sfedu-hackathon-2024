import { useDispatch, useSelector } from "react-redux";
import styles from "./RigthMenu.module.scss";
import { useEffect, useState } from "react";
import {
  deleteElem,
  setDraggable,
  setSelectedElement,
} from "../../store/CanvasSlice/canvas.Slice";

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
    dispatch(setSelectedElement({ id: null }));
  };

  const onBloked = () => {
    dispatch(setDraggable({ id: element.id }));
  };

  return (
    <div className={styles.RigthMenu}>
      <div className={styles.head}>
        <div className={styles.left}>
          <p>1 этаж</p>
          <img src="./img/v.svg" alt="img" />
        </div>
        <div className={styles.rigth}>
          <img src="./img/+.svg" alt="img" />
        </div>
      </div>
      {canvasSlice.selectedElement ? (
        <>
          <div className={styles.con1}>
            <div className={styles.box}>
              <span>X</span>
              <span>{element?.x?.toFixed(0)}</span>
            </div>
            <div className={styles.box}>
              <span>Y</span>
              <span>{element?.y?.toFixed(0)}</span>
            </div>
            <div className={styles.box}>
              <span>W</span>
              <span>{element?.width?.toFixed(0)}</span>
            </div>
            <div className={styles.box}>
              <span>H</span>
              <span>{element?.height?.toFixed(0)}</span>
            </div>
          </div>
          <div className={styles.con2}>
            <p>
              Название{" "}
              <img
                onClick={() => onBloked(element.id)}
                src={element?.draggable ? "./img/zo.svg" : "./img/zc.svg"}
                alt="img"
              />
            </p>

            <div className={styles.box}>
              <span>{element?.name}</span>
            </div>
          </div>
          <div className={styles.con2}>
            <p>Сотрудник</p>

            <div className={styles.box}>
              <span>Иванов И И</span>
            </div>
          </div>

          <div className={styles.con2}>
            <p>Стоимость</p>

            <div className={styles.box}>
              <span>25 000 ₽</span>
            </div>
          </div>

          <div className={styles.con2}>
            <p>Инвентарный номер</p>

            <div className={styles.box}>
              <span style={{ color: "#989898" }}>{element?.id}</span>
            </div>
          </div>
          <div className={styles.btn}>
            <button onClick={() => deleteElement(element.id)}>Удалить</button>
          </div>
        </>
      ) : (
        <div>Выберите элемент</div>
      )}
    </div>
  );
}

export default RigthMenu;
