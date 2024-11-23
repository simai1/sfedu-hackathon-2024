import { useState } from "react";
import styles from "./Poligon.module.scss";
import { useSelector } from "react-redux";

function Poligon() {
  const [coor, setCoor] = useState([9, 1]);
  const canvasSlice = useSelector((state) => state.CanvasSlice);

  const row = 20;
  const column = 20;
  const cessWidth = 25;

  const funClikCell = (r, c) => {
    let coor = [r, c];
    setCoor(coor);
  };

  return (
    <div className={styles.Poligon}>
      <div
        className={styles.setka}
        style={{ width: `${(column + 1) * cessWidth + row}px` }} // исправление: `${...}`
      >
        {Array.from({ length: row }).map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {Array.from({ length: column }).map((_, columnIndex) => (
              <div
                onClick={() => funClikCell(rowIndex, columnIndex)}
                className={styles.cell}
                style={{ width: cessWidth, height: cessWidth }}
                key={columnIndex}
              >
                {/* {
                  canvasSlice.elements.find(
                    (element) =>
                      element.x === rowIndex && element.y === columnIndex
                  )?.name
                } */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div width={2 * cessWidth} height={1 * cessWidth}></div>
    </div>
  );
}

export default Poligon;
