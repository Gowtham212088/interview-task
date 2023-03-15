import "./App.css";
import {Routes, Route } from "react-router-dom";
import LoginAndSignUp from "./pages/LoginAndSignUp";
import TopNavbar from "./Components/TopNavbar";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
<>
    <Routes>
     
      <Route path="/" exact element={<LoginAndSignUp />} title="login" />
      <Route path="/login" exact element={<LoginAndSignUp />} title="login" />
      <Route path="/dashboard" exact element={<Dashboard />} title="login" />
    </Routes>
    </>
  );
}

export default App;
