import { Link } from "react-router-dom";
import styles from "./Navigate.module.scss";

function Navigate() {
  return (
    <div className={styles.Navigate}>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/canvas">Конструктор</Link>
        </li>
        <li>
          <Link to="/authorization">Авторизация</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigate;
