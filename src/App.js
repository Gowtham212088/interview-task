import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginAndSignUp from "./pages/LoginAndSignUp";
import TopNavbar from "./Components/TopNavbar";
import Dashboard from "./Components/Dashboard";
import { useState } from "react";
function App() {

  const [users, getUsers] = useState([]);
console.log(users)
const [loginResponse, setLoginResponse] = useState({});

const filterUser = users.filter((e)=>{
  return e.name !== loginResponse
})
console.log(filterUser);
  return (
    <>
      <Routes>
        <Route path="/" exact element={<LoginAndSignUp />} title="login" />
        <Route path="/login" exact element={<LoginAndSignUp
loginResponse={loginResponse} 
setLoginResponse={setLoginResponse}
        />} title="login" />
        <Route path="/dashboard" exact element={<Dashboard
        filterUser={filterUser}
loginResponse={loginResponse} 
setLoginResponse={setLoginResponse}
        users={users}
        getUsers={getUsers}
        />} title="login" />
      </Routes>
    </>
  );
}

export default App;
