import MenuComponent from "../../components/CanvasComponets/MenuComponent/MenuComponent";
import Konva from "../../modules/Konva/Konva";
import RigthMenu from "../../modules/RigthMenu/RigthMenu";
import styles from "./CanvasPage.module.scss";

function CanvasPage() {
  return (
    <div className={styles.CanvasPage}>
      <MenuComponent />
      <Konva />
      <RigthMenu />
    </div>
  );
}

export default CanvasPage;
