import React, { useEffect } from 'react';
import styles from "./PhoneDataVizulizer.module.scss";

function PhoneDataVizulizer(props) {
    useEffect(() => {
        console.log("tableBody", props.tableBody);
        console.log("tableHeader", props.tableHeader);
    }, [props.tableBody]);

    const getBorder = (value) => {
        switch (value) {
          case "Хорошее":
            return "1px solid #0A9030";
          case "Сломано":
            return "1px solid #B20707";
        }
      };
    
      const getBackground = (value) => {
        switch (value) {
          case "Хорошее":
            return "#0A903014";
          case "Сломано":
            return "#B2070714";
        }
      };

      return ( 
        <div className={styles.PhoneDataVizulizer}>
            {props.tableBody.length > 0 ? ( // Corrected 'lenght' to 'length'
                props.tableBody.map((item, index) => (
                    <div key={item.id} className={styles.dataBlock}>
                        <div className={styles.dataBlockInner}>
                            {props.tableHeader.map(header => {
                                if (header.isActive && header.key !== "Qr") {
                                    return (
                                        <div 
                                            key={header.key} 
                                            className={`${styles.dataItem} ${header.key === "conditionHuman" ? styles.dataItemCondition : ''}`}
                                        >
                                            <strong>{header.value}:</strong> 
                                            <span style={{ border: getBorder(item[header.key]), backgroundColor: getBackground(item[header.key]) }}>
                                                {item[header.key]}
                                            </span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.dataBlockNote}>
                    <p>Нет данных</p>
                </div>
            )}
        </div>
    );
}

export default PhoneDataVizulizer;