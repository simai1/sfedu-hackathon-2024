import styles from "./OfficeHead.module.scss";
import { GetOfficeAll } from "../../API/ApiRequest";
import {
  setOffice,
  setSelectedOffice,
} from "../../store/basicSlice/basic.Slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function OfficeHead() {
  const dispatch = useDispatch();

  const [openModalOffice, setOpenModalOffice] = useState(false);
  const equipmentSlice = useSelector((state) => state.EquipmentSlice);
  useEffect(() => {
    GetOfficeAll().then((resp) => {
      if (resp?.status === 200) {
        dispatch(setOffice({ data: resp.data.data }));
      }
    });
  }, []);
  const selectOffice = (id) => {
    dispatch(setSelectedOffice({ id }));
    setOpenModalOffice(!openModalOffice);
  };

  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModalOffice(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  return (
    <div className={styles.OfficeHead}>
      <div className={styles.head}>
        <div
          className={styles.left}
          onClick={() => setOpenModalOffice(!openModalOffice)}
        >
          <p>
            {equipmentSlice.office.find(
              (item) => item.id === equipmentSlice.selectedOffice
            )?.name || "Офис"}
          </p>

          <img src="./img/v.svg" alt="img" />
        </div>
        <div className={styles.rigth}>
          <img src="./img/+.svg" alt="img" />
        </div>
        {openModalOffice && (
          <div ref={modalRef} className={styles.office}>
            <ul>
              {equipmentSlice.office.map((item) => (
                <li onClick={() => selectOffice(item.id)} key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficeHead;
