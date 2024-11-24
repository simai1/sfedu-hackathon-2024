import { useDispatch, useSelector } from "react-redux";
import styles from "./EquipmentType.module.scss";
import { useState } from "react";
import { addElem } from "../../../store/CanvasSlice/canvas.Slice";
import { components } from "../../../store/CanvasSlice/components";
function EquipmentType(props) {
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);

  const [openType, setOpenType] = useState(false);
  const dispatch = useDispatch();

  const funClikElement = (type, id) => {
    dispatch(addElem({ id: type + "", idEquipment: id }));
  };

  const clickLi = () => {
    setOpenType(!openType);
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
          {equipmentSlice.equipment
            .filter((el) => props.type.some((e) => e === el.type))
            .map((component) => (
              <li
                onClick={() => funClikElement(component.type, component.id)}
                className={styles.liType}
              >
                {component.name}
              </li>
            ))}
          {props.name === "Офис" &&
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
        </ul>
      )}
    </div>
  );
}

export default EquipmentType;
