import { useDispatch, useSelector } from "react-redux";
import styles from "./EquipmentType.module.scss";
import { useState } from "react";
import { addElem } from "../../../store/CanvasSlice/canvas.Slice";
import { components } from "../../../store/CanvasSlice/components";
import PodLiComponent from "./PodLiComponent";
function EquipmentType(props) {
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const canvasSlice = useSelector((state) => state.CanvasSlice);

  const [openType, setOpenType] = useState(false);
  const dispatch = useDispatch();

  const funClikElement = (type, id) => {
    dispatch(addElem({ id: type + "", idEquipment: id }));
  };

  const clickLi = () => {
    setOpenType(!openType);
  };

  const tehnika = [
    "Ноутбук",
    "Монитор",
    "Принтер",
    "Компьютер",
    "Кофемашина",
    "Клавиатура",
  ];

  const mebel = ["Стол", "Стул", "Диван", "Лампа"];
  const getLink = (name) => {
    switch (name) {
      case "Ноутбук":
        return "/img/n.svg";
      case "Монитор":
        return "/img/m.svg";
      case "Принтер":
        return "/img/pr.svg";
      case "Компьютер":
        return "/img/sb1.svg";
      case "Кофемашина":
        return "/img/kof.svg";
      case "Клавиатура":
        return "/img/k.svg";
      default:
    }
  };

  const getLink2 = (name) => {
    switch (name) {
      case "Стол":
        return "/img/stoll.svg";
      case "Стул":
        return "/img/stull.svg";
      case "Диван":
        return "/img/div.svg";
      case "Лампа":
        return "/img/lampp.svg";
    }
  };

  return (
    <div className={styles.EquipmentType}>
      <li onClick={clickLi}>
        <img
          style={{
            transform: openType ? "rotate(180deg)" : "",
            transition: "transform 0.3s ease-in-out",
          }}
          src="./img/arrow.svg"
          alt="img"
        />
        <span>{props.name}</span>
      </li>
      {openType && (
        <ul>
          {/* {equipmentSlice.equipment
            .filter((el) => props.type.some((e) => e === el.type))
            .map((component) => (
              <li
                onClick={() => funClikElement(component.type, component.id)}
                className={styles.liType}
              >
                {component.name}
              </li>
            ))} */}
          {props.action && (
            <li className={styles.liType} onClick={() => props.editSten()}>
              {canvasSlice.mode === 1 ? "Сохранить" : "Рисовать стены"}
            </li>
          )}

          {props.name === "Строение" &&
            components
              ?.filter(
                (el) => Number(el.elemId) > 99 && Number(el.elemId) < 199
              )
              ?.map((component) => (
                <li
                  className={styles.liType}
                  onClick={() =>
                    funClikElement(component.elemId, Date.now().toString())
                  }
                >
                  {component.name}
                </li>
              ))}

          {props.name === "Сотрудники" &&
            equipmentSlice.worker?.map((user) => (
              <li
                className={styles.liType}
                onClick={() => funClikElement(200, user.id)}
              >
                {user.name}
              </li>
            ))}

          {props.name === "Мебель" &&
            // equipmentSlice.equipment
            //   .filter((el) => props.type.some((e) => e === el.type))
            //   ?.map((user) => (
            //     <li
            //       className={styles.liType}
            //       onClick={() => funClikElement(user.type, user.id)}
            //     >
            //       {user.name}
            //     </li>
            //   ))
            mebel.map((el) => (
              <PodLiComponent
                funClikElement={funClikElement}
                getLink={getLink2}
                el={el}
                styles={styles}
              />
            ))}

          {props.name === "Техника" &&
            tehnika.map((el) => (
              <PodLiComponent
                funClikElement={funClikElement}
                getLink={getLink}
                el={el}
                styles={styles}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

export default EquipmentType;
