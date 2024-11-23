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
  }, [props?.tableHeader, props?.tableBody]);

  const getValue = (value, key) => {
    switch (key) {
      case "countOfEmployees":
        return value;
      default:
        return value || "___";
    }
  };

  const handleRowSelect = (rowId, e) => {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "IMG") {
      context.setSelectedRows((prevSelected) => {
        if (prevSelected.includes(rowId)) {
          return prevSelected.filter((id) => id !== rowId);
        } else {
          return [...prevSelected, rowId];
        }
      });
    }
  };

  const handleRowSelectInput = (rowId) => {
    context.setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

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

  const showPopup = (event, content) => {
    const { clientX, clientY } = event;
    setPopupInfo({
      visible: true,
      content,
      position: { top: clientY + 10, left: clientX + 10 }
    });
  };

  const hidePopup = () => {
    setPopupInfo({ ...popupInfo, visible: false });
  };

  const SelectAllCheckbox = () => {
    if (context.selectedRows.length === tableBodyData.length && tableBodyData.length !== 0) {
      context.setSelectedRows([]);
    } else {
      context.setSelectedRows(tableBodyData.map((row) => row.id));
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
                    id={context.activeTable === "Staff" && "GlovalChecboxPeople"}
                    checked={context.selectedRows.length === tableBodyData.length && tableBodyData.length !== 0}
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
            tableBodyData.map((row) => (
              <tr
                key={row.id}
                className={`${styles.tableRow} ${context.selectedRows.includes(row.id) ? styles.selectedRow : ''}`}
                onClick={(e) => { e.stopPropagation(); handleRowSelect(row.id, e); }}
              >
                {tableHeaderData.map((header) => (
                  <td
                    key={header.key}
                    name={header.key}
                    className={styles.mainTd}
                    style={{ backgroundColor: context.selectedRows.includes(row.id) ? "#1A7D781A" : "transparent" }}
                  >
                    {header.key === "name" ? (
                      <>
                        <input
                          className={styles.checkboxTd}
                          id={context.activeTable != "Equipment" && "checkboxTdNet"}
                          type="checkbox"
                          checked={context.selectedRows.includes(row.id)}
                          onChange={() => handleRowSelectInput(row.id)}
                          key={row[header.key]}
                        />
                        {context.selectedRows.includes(row.id) && <img className={styles.galochka} src="/img/galochca.svg" alt="Selected" id={context.activeTable != "Equipment" && "galochcaNet"} />}
                        {context.activeTable === "Equipment" && <img
                          className={styles.imgEquipment}
                          src={context.getLink(row[header.key])}
                          onMouseEnter={(e) => showPopup(e, row[header.key])}
                          onMouseLeave={hidePopup}
                          alt="Equipment"
                        />}
                        {context.activeTable != "Equipment" && <p className={styles.namesTd}>{row[header.key]}</p>}
                      </>
                    ) : header.key === "conditionHuman" ? (
                      <div className={styles.stateWrapper} key={row[header.key]}>
                        <div className={styles.state} style={{ border: getBorder(row[header.key]), backgroundColor: getBackground(row[header.key]) }}>
                          {row[header.key]}
                        </div>
                      </div>
                    ) : header.key === "equipment" ? (
                      <div className={styles.equipmentButton} key={row[header.key]}>
                        <div className={styles.equipmentButtonInner}>
                          <button onClick={() => context.setPopUp("PopUpEquipmentPeople")}>
                            <img src="./img/equipment.svg" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      getValue(row[header.key], header.key)
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