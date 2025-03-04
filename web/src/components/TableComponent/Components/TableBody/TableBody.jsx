import styles from "./TableBody.module.scss";

function TableBody({ data, header }) {
  return (
    <tbody className={styles.TableBody}>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {header.map((item, index) => (
            <td key={index} name={item.key}>
              {row[item.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
