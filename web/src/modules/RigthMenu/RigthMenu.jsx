import { useDispatch, useSelector } from "react-redux";
import styles from "./RigthMenu.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  apiAddElemConvas,
  deleteElem,
  setDraggable,
  setSelectedElement,
} from "../../store/CanvasSlice/canvas.Slice";
import { setSelectedFloor } from "../../store/basicSlice/basic.Slice";
import {
  apiAddFloor,
  apiDeleteFloor,
  apiGetConvas,
} from "../../API/ApiRequest";
import CreatFloor from "../../components/CreatFloor/CreatFloor";

function RigthMenu() {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const [accept, setAccept] = useState(false);
  const dispatch = useDispatch();
  const [openModalFloor, setOpenModalFloor] = useState(false);
  const [openModalCreateFloor, setOpenModalCreareFloor] = useState(false);
  const [element, setElement] = useState(
    canvasSlice.elements.find((elem) => elem.id === canvasSlice.selectedElement)
  );
  const [modalDeleteFloor, setModalDeleteFloor] = useState(false);

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
    // apiGetConvas(equipmentSlice.selectedFloor).then((res) => {
    //   if (res?.status === 200) {
    //     dispatch(apiAddElemConvas({ data: res.data?.data }));
    //   }
    // });
    if (canvasSlice.elements.length > 0) {
      setAccept(true);
    }
  };

  const acceptOk = () => {
    apiGetConvas(equipmentSlice.selectedFloor).then((res) => {
      if (res?.status === 200) {
        dispatch(apiAddElemConvas({ data: res.data?.data }));
      }
    });
    setAccept(false);
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
        setModalDeleteFloor("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const deleteFloor = (id) => {
    setModalDeleteFloor(id);
  };

  const deleteFloorTrue = (id) => {
    console.log("id", floors, id);
    apiDeleteFloor(id).then((req) => {
      if (req?.status === 200) {
        setFloors(floors.filter((it) => it.id !== id));
        dispatch(setSelectedFloor({ id: floors[0].id }));
      }
    });
    setModalDeleteFloor("");
  };

  return (
    <>
      {accept && (
        <div className={styles.Accept}>
          <p>
            Не сохраненниые данные будут утеряны! <br />
            <p style={{ paddingTop: "10px" }}>Продолжить?</p>
          </p>
          <div className={styles.button}>
            <button onClick={() => setAccept(false)}>Отменить</button>
            <button onClick={acceptOk}>Продолжить</button>
          </div>
        </div>
      )}

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
                    <div
                      className={styles.delete}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFloor(item.id);
                      }}
                    >
                      <img src="./img/delete.svg" alt="img" />
                    </div>
                    {modalDeleteFloor === item.id && (
                      <div className={styles.deletFloor}>
                        <p>Вы уверены что хотите удалить этаж?</p>
                        <div className={styles.btn}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalDeleteFloor("");
                            }}
                          >
                            отменить
                          </button>
                          <button onClick={() => deleteFloorTrue(item.id)}>
                            удалить
                          </button>
                        </div>
                      </div>
                    )}
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
    </>
  );
}

export default RigthMenu;
