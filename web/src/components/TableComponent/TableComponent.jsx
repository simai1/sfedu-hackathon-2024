import TableBody from "./Components/TableBody/TableBody";
import TableHead from "./Components/TableHead/TableHead";
import styles from "./TableComponent.module.scss";

function TableComponent({ header, data }) {
  return (
    <div className={styles.TableComponent}>
      <table className={styles.table_container}>
        <TableHead header={header} />
        <TableBody data={data} header={header} />
      </table>
    </div>
  );
}

export default TableComponent;
