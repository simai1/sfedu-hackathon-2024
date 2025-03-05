import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import Authorization from "./pages/Auth/Authorization";
import "./styles/app.css";
import HelloPage from "./pages/HelloPage/HelloPage";
import {
  tableHeadAppoint,
  tableHeadOfise,
  tableHeadPeople,
} from "./components/UniversalTable/testData";
import {
  GetEquipment,
  GetOffice,
  GetProfile,
  GetWorker,
} from "./API/ApiRequest";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { disAddUserApi } from "./store/userSlice/user.Slice";
import MainPage from "./pages/MainPage/MainPage";
import FooterHomePageComp from "./components/FooterHomePage/FooterHomePage";
import Offices from "./modules/TableModule/Offices/Offices";
import Equipment from "./modules/TableModule/Equipment/Equipment";
import Workers from "./modules/TableModule/Workers/Workers";

function App() {
  const dispatch = useDispatch();
  const [unauthorized, setUnauthorized] = useState(true);
  const [activeTable, setActiveTable] = useState("Equipment");
  const [tableBody, setTableBody] = useState([]);
  const [tableHeader, setTableHeader] = useState(tableHeadAppoint);
  const [selectedRows, setSelectedRows] = useState([]);
  const [popUp, setPopUp] = useState("");
  const [valueNameStaff, setValueNameStaff] = useState("");
  const [valueNameEquipment, setValueNameEquipment] = useState("");
  const [valueNameOffise, setValueNameOffise] = useState("");
  const [searchText, setSearchText] = useState("");
  const [exportFilePopUp, setExportFilePopUp] = useState(false);
  const [role, setRole] = useState("");
  const [getProfileId, setGetProfileId] = useState(null);
  const getTableData = (value) => {
    switch (value) {
      case "Equipment":
        getEquuipmentData(searchText);
        break;
      case "office":
        getOfficeData(searchText);
        break;
      case "Staff":
        getEmployeeData(searchText);
        break;
      default:
        getEquuipmentData("");
    }
  };

  useEffect(() => {
    getTableData(activeTable);
  }, [searchText]);

  const getEquuipmentData = (searchText) => {
    GetEquipment(searchText).then((resp) => {
      if (resp?.status === 200) {
        setTableBody(resp.data.data);
        setTableHeader(tableHeadAppoint);
      }
    });
  };

  const getOfficeData = (searchText) => {
    GetOffice(searchText).then((resp) => {
      if (resp?.status === 200) {
        setTableBody(resp.data.data);
        setTableHeader(tableHeadOfise);
      }
    });
  };

  const getEmployeeData = (searchText) => {
    GetWorker(searchText).then((resp) => {
      if (resp?.status === 200) {
        setTableBody(resp.data.data);
        setTableHeader(tableHeadPeople);
      }
    });
  };

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
  };

  const context = {
    unauthorized,
    setUnauthorized,
    getEquuipmentData,
    setActiveTable,
    getTableData,
    activeTable,
    tableBody,
    setTableBody,
    role,
    setRole,
    tableHeader,
    exportFilePopUp,
    setExportFilePopUp,
    setTableHeader,
    setSelectedRows,
    selectedRows,
    setGetProfileId,
    getProfileId,
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
    getEmployeeData,
    setSearchText,
    searchText,
  };

  useEffect(() => {
    switch (activeTable) {
      case "Equipment":
        setTableHeader(tableHeadAppoint);
        break;
      case "office":
        setTableHeader(tableHeadPeople);
        break;
      case "Staff":
        setTableHeader(tableHeadOfise);
        break;
      default:
        break;
    }
  }, [activeTable]);

  //! получаем данные user
  const userData = useQuery({
    queryKey: [`user`],
    queryFn: () => GetProfile(),
    enabled: true,
  });

  //! записываем данные user в редукс
  useEffect(() => {
    if (userData.data) {
      dispatch(disAddUserApi({ data: userData?.data?.data }));
    }
  }, [userData]);

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
            <Route path="/mainpage" element={<MainPage />}>
              <Route path="" element={<Offices />}></Route>
              <Route path="equipment" element={<Equipment />}></Route>
              <Route path="workers" element={<Workers />}></Route>
            </Route>
          </Routes>
          <FooterHomePageComp />
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
