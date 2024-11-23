import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import Authorization from "./pages/Auth/Authorization";
import "./styles/app.css";
import HelloPage from "./pages/HelloPage/HelloPage";
import Konva from "./modules/Konva/Konva";
import { tableBodyOfiseTestData, tableBodyPeopleTestData, tableBodytestData, tableHeadAppoint, tableHeadOfise, tableHeadPeople } from "./components/UniversalTable/testData";

function App() {
  const [unauthorized, setUnauthorized] = useState(true);
  const [activeTable, setActiveTable] = useState("Equipment");
  const [tableBody, setTableBody] = useState(tableBodytestData);
  const [tableHeader, setTableHeader] = useState(tableHeadAppoint);
  const [selectedRows, setSelectedRows] = useState([]);
  const [popUp, setPopUp] = useState("");

  const context = {
    unauthorized,
    setUnauthorized,
    setActiveTable,
    activeTable,
    tableBody,
    setTableBody,
    tableHeader,
    setTableHeader,
    setSelectedRows,
    selectedRows,
    popUp,
    setPopUp
  };

  useEffect(() => {
    switch (activeTable) {
      case "Equipment":
        setTableBody(tableBodytestData);
        setTableHeader(tableHeadAppoint);
        break;
      case "office":
        setTableBody(tableBodyPeopleTestData);
        setTableHeader(tableHeadPeople);
        break;
      case "Staff":
        setTableBody(tableBodyOfiseTestData);
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