import React from "react";
import Table from "./Table";
import TopNavbar from "./TopNavbar";

function Dashboard({users, getUsers,loginResponse, setLoginResponse,filterUser}) {
  return (
    <>
      <TopNavbar
      loginResponse={loginResponse}
      />
      <Table 
      filterUser={filterUser}
      loginResponse={loginResponse}
       setLoginResponse={setLoginResponse}
       users={users}
       getUsers={getUsers}
      />
    </>
  );
}

export default Dashboard;
