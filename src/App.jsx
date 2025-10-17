import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detalhes from "./pages/detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personagem/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}
