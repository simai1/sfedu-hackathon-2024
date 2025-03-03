import styles from "./LeftMenu.module.scss";
import logoIcon from "./../../assets/img/logotype/logo.svg";
import officeIcon from "../../assets/img/leftMenu/office.svg";
import deviceIcon from "../../assets/img/leftMenu/device.svg";
import personsIcon from "../../assets/img/leftMenu/persons.svg";
import errorsIcon from "../../assets/img/leftMenu/errors.svg";
import constructorIcon from "../../assets/img/leftMenu/constructor.svg";

function LeftMenu() {
  const listMenu = [
    {
      icon: officeIcon,
      title: "Офисы",
      navigate: "#",
    },
    {
      icon: deviceIcon,
      title: "Оборудование",
      navigate: "#",
    },
    {
      icon: personsIcon,
      title: "Сотрудники",
      navigate: "#",
    },
    {
      icon: errorsIcon,
      title: "Неполадки",
      navigate: "#",
    },
  ];

  return (
    <div className={styles.LeftMenu}>
      <div className={styles.logotype}>
        <img src={logoIcon} alt="Логотип" />
      </div>
      <div className={styles.container}>
        <div className={styles.tables_box}>
          <span>Таблицы</span>
          <ul className={styles.list_item}>
            {listMenu.map((item, index) => (
              <li key={index}>
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
    </div>
  );
}

export default LeftMenu;
