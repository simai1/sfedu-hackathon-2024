import TableComponent from "../../../components/TableComponent/TableComponent";
import HeadMenu from "../Components/HeadMenu/HeadMenu";
import { header, testData } from "./data";
import styles from "./Offices.module.scss";

function Offices() {
  return (
    <div className={styles.Offices}>
      <HeadMenu />
      <TableComponent header={header} data={testData} />
    </div>
  );
}

export default Offices;
