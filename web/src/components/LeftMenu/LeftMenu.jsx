import styles from "./LeftMenu.module.scss";
import logoIcon from "./../../assets/img/logotype/logo.svg";
import officeIcon from "../../assets/img/leftMenu/office.svg";
import deviceIcon from "../../assets/img/leftMenu/device.svg";
import personsIcon from "../../assets/img/leftMenu/persons.svg";
import errorsIcon from "../../assets/img/leftMenu/errors.svg";
import constructorIcon from "../../assets/img/leftMenu/constructor.svg";
import paramIcon from "../../assets/img/leftMenu/param.svg";
import userIcon from "../../assets/img/leftMenu/user.svg";
import { useNavigate } from "react-router-dom";

function LeftMenu() {
  const navigate = useNavigate();

  const listMenu = [
    {
      icon: officeIcon,
      title: "Офисы",
      navigate: "/mainpage",
    },
    {
      icon: deviceIcon,
      title: "Оборудование",
      navigate: "/mainpage/equipment",
    },
    {
      icon: personsIcon,
      title: "Сотрудники",
      navigate: "/mainpage/workers",
    },
    {
      icon: errorsIcon,
      title: "Неполадки",
      navigate: "/mainpage",
    },
  ];

  return (
    <div className={styles.LeftMenu}>
      <div className={styles.logotype}>
        <img src={logoIcon} alt="Логотип" />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.tables_box}>
            <span>Таблицы</span>
            <ul className={styles.list_item}>
              {listMenu.map((item, index) => (
                <li key={index} onClick={() => navigate(item.navigate)}>
                  <img src={item.icon} alt="img" />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.constructor_box}>
            <ul className={styles.list_item}>
              <li>
                <img src={constructorIcon} alt="img" />
                <span>Конструктор</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.container_bottom}>
          <ul className={styles.list_item}>
            <li>
              <img src={paramIcon} alt="img" />
              <span>Настройки</span>
            </li>
            <li>
              <img src={userIcon} alt="img" />
              <span>Профиль</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
