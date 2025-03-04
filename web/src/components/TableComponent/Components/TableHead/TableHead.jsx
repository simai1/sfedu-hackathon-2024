import styles from "./TableHead.module.scss";

function TableHead({ header }) {
  return (
    <thead className={styles.TableHead}>
      <tr>
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
