import { useDispatch, useSelector } from "react-redux";
import styles from "./RigthMenu.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  deleteElem,
  setDraggable,
  setSelectedElement,
} from "../../store/CanvasSlice/canvas.Slice";
import { setSelectedFloor } from "../../store/basicSlice/basic.Slice";
import { apiAddFloor } from "../../API/ApiRequest";
import CreatFloor from "../../components/CreatFloor/CreatFloor";

function RigthMenu() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const dispatch = useDispatch();
  const [openModalFloor, setOpenModalFloor] = useState(false);
  const [openModalCreateFloor, setOpenModalCreareFloor] = useState(false);
  const [element, setElement] = useState(
    canvasSlice.elements.find((elem) => elem.id === canvasSlice.selectedElement)
  );

  const [creatFloorData, setCreatFloorData] = useState({
    name: "",
    number: "",
  });

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

  const selectFloor = (id) => {
    dispatch(setSelectedFloor({ id }));
    setOpenModalFloor(false);
  };

  const addFloor = () => {
    setOpenModalCreareFloor(!openModalCreateFloor);
  };

  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const dat = equipmentSlice.office.find(
      (it) => it.id === equipmentSlice.selectedOffice
    )?.floors;

    // Проверяем, что `dat` существует и является массивом, затем сортируем по `name`
    if (Array.isArray(dat)) {
      const sortedFloors = [...dat].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0; // Сохраняем порядок, если имена равны
      });

      setFloors(sortedFloors);
    } else {
      setFloors([]); // Или другое значение по умолчанию, если `dat` отсутствует
    }
  }, [equipmentSlice.office, equipmentSlice.selectedOffice]);
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModalCreareFloor(false);
      }
      if (modalRef2.current && !modalRef2.current.contains(event.target)) {
        setOpenModalFloor(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  return (
    <div className={styles.RigthMenu}>
      <div className={styles.head}>
        <div
          className={styles.left}
          onClick={() => setOpenModalFloor(!openModalFloor)}
        >
          <p>
            {equipmentSlice.office
              .find((it) => it.id === equipmentSlice.selectedOffice)
              ?.floors.find((it) => it.id === equipmentSlice.selectedFloor)
              ?.name || "Этаж"}
          </p>

          <img src="./img/v.svg" alt="img" />
        </div>
        <div className={styles.rigth} onClick={addFloor}>
          <img src="./img/+.svg" alt="img" />
        </div>
        {openModalCreateFloor && (
          <div ref={modalRef}>
            <CreatFloor
              creatFloorData={creatFloorData}
              setCreatFloorData={setCreatFloorData}
              setOpenModalCreareFloor={setOpenModalCreareFloor}
              setFloors={setFloors}
            />
          </div>
        )}
        {openModalFloor && (
          <div className={styles.office} ref={modalRef2}>
            <ul>
              {floors.map((item) => (
                <li onClick={() => selectFloor(item.id)} key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
            {floors.length === 0 && (
              <p className={styles.noFloor}>Нет этажей</p>
            )}
          </div>
        )}
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
              <span>
                {(() => {
                  const cost = equipmentSlice.equipment.find(
                    (el) => el.id === element?.idEquipment
                  )?.cost;

                  if (cost !== undefined) {
                    // Применяем форматирование с пробелами для тысячи
                    return `${Number(cost).toLocaleString("ru-RU")} ₽`;
                  }

                  return "Цена не указана";
                })()}
              </span>
            </div>
          </div>

          <div className={styles.con2}>
            <p>Инвентарный номер</p>

            <div className={styles.box}>
              <span style={{ color: "#989898" }}>
                {equipmentSlice.equipment.find(
                  (el) => el.id === element?.idEquipment
                )?.inventoryNumber || "Отсутствует"}
              </span>
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
