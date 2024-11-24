import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./EquipmentType.module.scss";

function PodLiComponent(props) {
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);

  const [active, setActive] = useState(false);
  const liClick = () => {
    setActive(!active);
  };

  return (
    <>
      <li className={styles.liTypeTeh} onClick={() => liClick()}>
        <img className={styles.liTypeTehImg} src="./img/arrow.svg" alt="img" />
        <img src={props.getLink(props.el)} alt="img" />
        <span>{props.el}</span>
      </li>
      {active && (
        <ul>
          {equipmentSlice.equipment
            ?.filter((elem) => elem.typeHuman === props.el)
            ?.map((el) => {
              return (
                <li
                  onClick={() => props.funClikElement(el.type, el.id)}
                  className={styles.liTypeTeh2}
                >
                  {el.name}/{el.inventoryNumber}
                </li>
              );
            })}
          {equipmentSlice.equipment?.filter(
            (elem) => elem.typeHuman === props.el
          ).length === 0 && <li className={styles.noData}>Нет оборудования</li>}
        </ul>
      )}
    </>
  );
}

export default PodLiComponent;
