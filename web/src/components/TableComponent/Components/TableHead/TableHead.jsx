import styles from "./TableHead.module.scss";

function TableHead({ header }) {
  return (
    <thead className={styles.TableHead}>
      <tr>
        <th name="checkbox">
          <input type="checkbox" />
        </th>
        {header.map((item, index) => (
          <th key={index} name={item.key}>
            {item.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
