import LeftMenu from "../../components/LeftMenu/LeftMenu";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
    <div className={styles.MainPage}>
      <LeftMenu />
      <div className={styles.main_container}></div>
    </div>
  );
}

export default MainPage;
