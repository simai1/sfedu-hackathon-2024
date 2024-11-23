import React, { useContext, useEffect, useState } from "react";
import styles from "./UniversalTable.module.scss";
import DataContext from "../../context";

function UniversalTable(props) {
  const context = useContext(DataContext);
  const [tableHeaderData, setTableHeaderData] = useState([]);
  const [tableBodyData, setTableBodyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [popupInfo, setPopupInfo] = useState({ visible: false, content: '', position: { top: 0, left: 0 } });

  useEffect(() => {
    setTableHeaderData(props?.tableHeader);
    setTableBodyData(props?.tableBody);
    console.log("props?.tableBody", props?.tableBody);
  }, [props?.tableHeader, props?.tableBody]);

  const getValue = (value, key) => {
    switch (key) {
      default:
        return value || "___";
    }
  };

  const handleCheckboxChange = (e, rowIndex) => {
    e.stopPropagation(); // Prevent the row click event
    handleRowSelect(rowIndex);
  };

  const handleRowSelect = (rowIndex, e) => {
    console.log("rowIndex", rowIndex);
    console.log("e", e.target.tagName)
    if(e.target.tagName != "INPUT" && e.target.tagName != "IMG") {
    context.setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowIndex)) {
        return prevSelected.filter((index) => index !== rowIndex);
      } else {
        return [...prevSelected, rowIndex];
      }
    });
  }
  };
  const handleRowSelectInput = (rowIndex) => {
    context.setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowIndex)) {
        return prevSelected.filter((index) => index !== rowIndex);
      } else {
        return [...prevSelected, rowIndex];
      }
    });
  
  };
  
  const getBorder = (value) => {
    switch (value) {
      case "Хорошее":
        return "1px solid#0A9030";
      case "Неисправное":
        return "1px solid #B20707";
    }
  }
  const getBackground = (value) => {
    switch (value) {
      case "Хорошее":
        return "#0A903014";
      case "Неисправное":
        return "#B2070714";
    }
  }

  const showPopup = (event, content) => {
    const { clientX, clientY } = event;
    setPopupInfo({
      visible: true,
      content,
      position: { top: clientY + 10, left: clientX + 10 } // Position the popup slightly offset from the cursor
    });
  };

  const hidePopup = () => {
    setPopupInfo({ ...popupInfo, visible: false });
  };
  const SelectAllCheckbox = () => {
    if (context.selectedRows.length === tableBodyData.length) {
      context.setSelectedRows([]);
    } else {
      context.setSelectedRows(tableBodyData.map((_, index) => index));
    }
  };

  return (
    <div className={styles.UniversalTable}>
      <table>
      <thead>
        <tr>
          {tableHeaderData?.map((el, index) => (
            el.key === "name" ? (
              <th key={index} name={el.key}>
                <input
                  className={styles.checkboxGlobal}
                  type="checkbox"
                  id={ context.activeTable === "Staff" && "GlovalChecboxPeople"}
                  checked={context.selectedRows.length === tableBodyData.length}
                  onChange={(e) => {
                    e.stopPropagation();
                    SelectAllCheckbox();
                  }}
                     />
                {context.selectedRows.length === tableBodyData.length && <img className={styles.galochkaAll} src="/img/galochca.svg" alt="Selected" />}
                {el.value}
              </th>
            ) : (
              <th key={index} name={el.key}>
                {el.value}
              </th>
            )
          ))}
        </tr>
      </thead>
        <tbody>
          {tableBodyData?.length > 0 ? (
            tableBodyData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${styles.tableRow} ${context.selectedRows.includes(rowIndex) ? styles.selectedRow : ''}`}
                onClick={(e) =>   {e.stopPropagation(); handleRowSelect(rowIndex, e)}}
              >
                {tableHeaderData.map((header) => (
                  <td
                    key={header.key}
                    name={header.key}
                    className={styles.mainTd}
                    style={{ backgroundColor: context.selectedRows.includes(rowIndex) ? "#1A7D781A" : "transparent" }}
                  >
                  
                    {header.key === "name" ? (
                    <>
                      <input
                        className={styles.checkboxTd}
                        id={ context.activeTable != "Equipment" && "checkboxTdNet"}
                        type="checkbox"
                        checked={context.selectedRows.includes(rowIndex)}
                        onChange={() => handleRowSelectInput(rowIndex)} 
                        key={row[header.key]}
                      />
                      
                      {context.selectedRows.includes(rowIndex) && <img className={styles.galochka} src="/img/galochca.svg" alt="Selected"  id={ context.activeTable != "Equipment" && "galochcaNet"} />}
                      { context.activeTable === "Equipment" && <img 
                        className={styles.imgEquipment} 
                        src="./img/notebook.svg" 
                        onMouseEnter={(e) => showPopup(e, row[header.key])} 
                        onMouseLeave={hidePopup} 
                        alt="Equipment"
                      />}
                      {
                        context.activeTable != "Equipment" && <p className={styles.namesTd}>{row[header.key]}</p>
                      }
                    </>
                  ) : header.key === "state" ? (
                      <div className={styles.stateWrapper} key={row[header.key]}> {/* Unique wrapper for styling */}
                        <div className={styles.state} style={{ border: getBorder(row[header.key]), backgroundColor: getBackground(row[header.key]) }}>
                          {row[header.key]}
                        </div>
                      </div>
                    ): header.key === "equipment" ? (
                      <div className={styles.equipmentButton} key={row[header.key]}> {/* Unique wrapper for styling */}
                        <div className={styles.equipmentButtonInner}>
                          <button onClick={() => context.setPopUp("PopUpEquipmentPeople")}>
                            <img src="./img/equipment.svg"/>
                          </button>
                        </div>
                      </div>
                    ) : (
                      getValue(row[header.key], header.key) // Render the value
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaderData.length} className={styles.tableNotData}>
                Нет данных
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {popupInfo.visible && (
        <div 
          className={styles.popup} 
          style={{ top: popupInfo.position.top, left: popupInfo.position.left }}
        >
          {popupInfo.content}
        </div>
      )}
    </div>
  );
}

export default UniversalTable;