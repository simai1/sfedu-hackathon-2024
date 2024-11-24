import React, { useEffect, useState } from 'react';
import styles from "./PhoneDataVizulizer.module.scss";

function PhoneDataVizulizer(props) {
    const [dataBody, setDataBody] = useState([]);
    const [dataHeader, setDataHeader] = useState([]);
    useEffect(() => {
        setDataBody(props?.tableBody);
        setDataHeader(props?.tableHeader);
    }, [props?.tableBody, props?.tableHeader]);

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
            {dataBody.length > 0 ? ( // Corrected 'lenght' to 'length'
                dataBody.map((item, index) => (
                    <div key={item.id} className={styles.dataBlock}>
                        <div className={styles.dataBlockInner}>
                            {dataHeader.map(header => {
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