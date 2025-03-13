import { Container } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/global/AppNavbar";
import Sidebar from "../components/global/Sidebar";

const DashboardLayout = () => {
  const [dashboardState, setDashboardState] = useState({
    collapsed: false,
    toggled: false,
    rtl: false,
  });

  const handleToggle = (key) => {
    setDashboardState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="w-screen">
      <AppNavbar
        handleToggle={handleToggle}
        collapsed={dashboardState.collapsed}
      />
      <Sidebar
        collapsed={dashboardState.collapsed}
        toggled={dashboardState.toggled}
        rtl={dashboardState.rtl}
      />
      <main className={`main-section ${dashboardState.collapsed && "active"}`}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default DashboardLayout;
