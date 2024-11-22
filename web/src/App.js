import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import Authorization from "./pages/Auth/Authorization";
import "./styles/app.css";
import HelloPage from "./pages/HelloPage/HelloPage";
import Konva from "./modules/Konva/Konva";

function App() {
  const [unauthorized, setUnauthorized] = useState(true);
  const [activeTable, setActiveTable] = useState("office");
  const context = {
    unauthorized,
    setUnauthorized,
    setActiveTable,
    activeTable
  };

  return (
    <DataContext.Provider value={context}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Authorization />}></Route>
            <Route path="/canvas" element={<CanvasPage />}></Route>
            <Route path="/homePage" element={<HomePage />}></Route>
            <Route path="/helloPage" element={<HelloPage />}></Route>
            <Route path="/konva" element={<Konva />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;