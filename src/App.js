/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandLight from "assets/images/logo-ct.png";

// Import Cookies
import { useCookies } from "react-cookie";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [cookie] = useCookies(["userId", "role"]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  function renderContent() {
    if (layout === "dashboard" && cookie.role === "Administrator") {
      return (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandLight}
            brandName="Document Tracking"
            routes={routes.adminRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Routes>
            {getRoutes(routes.adminRoutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      );
    }

    if (layout === "dashboard" && cookie.role === "Procurement Staff") {
      return (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandLight}
            brandName="Inventory Management"
            routes={routes.procurementStaffRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Routes>
            {getRoutes(routes.procurementStaffRoutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      );
    }

    if (layout === "dashboard" && cookie.role === "Approving Body") {
      return (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandLight}
            brandName="Inventory Management"
            routes={routes.approvingBodyRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Routes>
            {getRoutes(routes.approvingBodyRoutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      );
    }

    if (layout === "dashboard" && cookie.role === "Requestor") {
      return (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandLight}
            brandName="Inventory Management"
            routes={routes.requestorRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Routes>
            {getRoutes(routes.requestorRoutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      );
    }

    return <div>No Role Assigned</div>;
  }

  return cookie.userId && cookie.role ? (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      {renderContent()}
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes.publicRoutes)}
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
