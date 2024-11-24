import { useDispatch, useSelector } from "react-redux";
import { apiAddFloor, GetOffice } from "../../API/ApiRequest";
import styles from "./CreatFloor.module.scss";
import { useState } from "react";
import { setOffice } from "../../store/basicSlice/basic.Slice";

function CreatFloor(props) {
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const changeDataName = (e) => {
    props.setCreatFloorData({ ...props.creatFloorData, name: e.target.value });
  };
  //   const changeDataNumber = (e) => {
  //     props.setCreatFloorData({
  //       number: e.target.value,
  //       ...props.creatFloorData,
  //     });
  //   };

  const addFloor = () => {
    const dat = {
      name: props.creatFloorData.name,
      buildingId: equipmentSlice.selectedOffice,
    };
    apiAddFloor(dat).then((req) => {
      if (req?.status === 200) {
        GetOffice()
          .then((resp) => {
            if (resp?.status === 200) {
              dispatch(setOffice({ data: resp.data.data }));
            }
          })
          .finally(() => {
            props.setOpenModalCreareFloor(false);
          });
        props.setCreatFloorData({ name: "", number: "" });
      } else {
        setError("Произошла ошибка");
      }
    });
  };

  return (
    <div className={styles.CreatFloor}>
      <input
        type="text"
        placeholder="Наименование"
        value={props.creatFloorData.name}
        onChange={changeDataName}
      />
      {/* <input
        type="text"
        placeholder="Номер"
        value={props.number}
        onChange={changeDataNumber}
      /> */}
      <button onClick={addFloor}>Добавить</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default CreatFloor;
