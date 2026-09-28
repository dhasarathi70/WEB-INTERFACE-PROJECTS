import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/register"
            element={<RegistrationPage />}
          />

          <Route
            path="/success"
            element={<RegistrationSuccessPage />}
          />

          {/* 
            Fallback route.
            Prevents a blank page when the user opens
            an unmatched/direct project URL.
          */}
          <Route
            path="*"
            element={<HomePage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;