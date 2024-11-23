import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import Authorization from "./pages/Auth/Authorization";
import "./styles/app.css";
import HelloPage from "./pages/HelloPage/HelloPage";
import {tableHeadAppoint, tableHeadOfise, tableHeadPeople } from "./components/UniversalTable/testData";
import { GetEquipment, GetOffice, GetWorker } from "./API/ApiRequest";


function App() {
  const [unauthorized, setUnauthorized] = useState(true);
  const [activeTable, setActiveTable] = useState("Equipment");
  const [tableBody, setTableBody] = useState([]);
  const [tableHeader, setTableHeader] = useState(tableHeadAppoint);
  const [selectedRows, setSelectedRows] = useState([]);
  const [popUp, setPopUp] = useState("");
  const [valueNameStaff, setValueNameStaff] = useState("");
  const [valueNameEquipment, setValueNameEquipment] = useState("");
  const [valueNameOffise, setValueNameOffise] = useState(""); 



const getTableData = (value) => {
  switch (value) {
    case "Equipment":
      getEquuipmentData();
      break;
    case "office":
      getOfficeData();      
      break;
    case "Staff":
      getEmployeeData();
      break;
    default:
      break;
  }
}

 const getEquuipmentData = () =>{
  GetEquipment().then((resp)=>{
    if(resp?.status === 200){
    setTableBody(resp.data.data);
    setTableHeader(tableHeadAppoint);
    }
  })
 }

 const getOfficeData = () =>{
  GetOffice().then((resp)=>{
    if(resp?.status === 200){
    setTableBody(resp.data.data)
    setTableHeader(tableHeadOfise);
    }
  })
 }

 const getEmployeeData = () =>{
  GetWorker().then((resp)=>{
    if(resp?.status === 200){
    setTableBody(resp.data.data)
    setTableHeader(tableHeadPeople);
    }
  })
 }
 

const getLink = (name) => {
  switch (name) {
      case "Ноутбук":
          return "/img/notebook.svg";
      case "Стол":
          return "/img/table.svg";
      case "Лампа":
          return "/img/lamp.svg";
      case "Монитор":
          return "/img/monitor.svg";
      case "Диван":
          return "/img/divan.svg";
      case "Принтер":
          return "/img/printer.svg";
      case "Компьютер":
          return "/img/system.svg";
      case "Кофемашина":
          return "/img/cofeWorker.svg";
      case "Клавиатура":
          return "/img/clava.svg";
      case "Стул":
          return "/img/stul.svg";
      default:
  }
}

  const context = {
    unauthorized,
    setUnauthorized,
    getEquuipmentData,
    setActiveTable,
    getTableData,
    activeTable,
    tableBody,
    setTableBody,
    tableHeader,
    setTableHeader,
    setSelectedRows,
    selectedRows,
    popUp,
    setPopUp,
    getLink,
    valueNameStaff,
    setValueNameStaff,
    valueNameEquipment,
    setValueNameEquipment,
    valueNameOffise,
    setValueNameOffise,
    getOfficeData,
    getEmployeeData
  };

  useEffect(() => {
    switch (activeTable) {
      case "Equipment":
        // setTableBody(tableBodytestData);
        setTableHeader(tableHeadAppoint);
        break;
      case "office":
        // setTableBody(tableBodyPeopleTestData);
        setTableHeader(tableHeadPeople);
        break;
      case "Staff":
        // setTableBody(tableBodyOfiseTestData);
        setTableHeader(tableHeadOfise);
        break;
      default:
        break;
    }
  },[activeTable])



  return (
    <DataContext.Provider value={context}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Authorization />}></Route>
            <Route path="/canvas" element={<CanvasPage />}></Route>
            <Route path="/homePage" element={<HomePage />}></Route>
            <Route path="/helloPage" element={<HelloPage />}></Route>
            <Route path="/konva" element={<CanvasPage />}></Route>
           
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;