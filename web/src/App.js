import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import Konva from "./modules/Konva/Konva";

function App() {
  const context = {
    valueBasic: "Home Page",
  };

  return (
    <DataContext.Provider value={context}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/canvas" element={<CanvasPage />}></Route>
            <Route path="/konva" element={<Konva />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
