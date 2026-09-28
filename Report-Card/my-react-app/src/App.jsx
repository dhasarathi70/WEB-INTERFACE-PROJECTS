import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Profile from "./pages/Profile";
import Semester1 from "./pages/Semester1";
import Semester2 from "./pages/Semester2";
import Semester3 from "./pages/Semester3";
import Overall from "./pages/Overall";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/semester-1" element={<Semester1 />} />
        <Route path="/semester-2" element={<Semester2 />} />
        <Route path="/semester-3" element={<Semester3 />} />
        <Route path="/overall" element={<Overall />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;