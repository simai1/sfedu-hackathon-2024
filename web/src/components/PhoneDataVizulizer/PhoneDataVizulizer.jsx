import React, { useEffect } from 'react';
import styles from "./PhoneDataVizulizer.module.scss";

function PhoneDataVizulizer(props) {
    useEffect(() => {
        console.log("tableBody", props.tableBody);
        console.log("tableHeader", props.tableHeader);
    }, [props.tableBody]);

    return ( 
        <div className={styles.PhoneDataVizulizer}>
            {props.tableBody.map((item, index) => (
                <div key={item.id} className={styles.dataBlock}>
                <div key={item.id} className={styles.dataBlockInner}>
                    {props.tableHeader.map(header => {
                        if (header.isActive && header.key !== "Qr") {
                            return (
                                <div key={header.key} className={styles.dataItem}>
                                    <strong>{header.value}:</strong> <span>{item[header.key]}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                </div>
            ))}
        </div>
    );
}

export default PhoneDataVizulizer;