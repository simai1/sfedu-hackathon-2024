import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import Authorization from "./pages/Auth/Authorization";
import "./styles/app.css";
import HelloPage from "./pages/HelloPage/HelloPage";

function App() {
  const [unauthorized, setUnauthorized] = useState(false);
  const context = {
    unauthorized,
    setUnauthorized
  };

  return (
    <DataContext.Provider value={context}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/canvas" element={<CanvasPage />}></Route>
            <Route path="/authorization" element={<Authorization />}></Route>
            <Route path="/helloPage" element={<HelloPage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;