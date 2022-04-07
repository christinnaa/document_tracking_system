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
import brandDark from "assets/images/logo-ct-dark.png";

// Import Cookies
import { useCookies } from "react-cookie";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [cookie] = useCookies(["userId", "role"]);
  // const [cookie, setCookie] = useCookies(["userId", "role"]);

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

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    // setCookie("", "");
    // setCookie("userId", "001");
    // setCookie("role", "Administrator");
  });

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

  return cookie.userId && cookie.role ? (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      {layout === "dashboard" && cookie.role === "Administrator" ? (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandDark}
            brandName="Inventory System"
            routes={routes.adminRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator /> */}
          {/* {configsButton} */}

          <Routes>
            {getRoutes(routes.adminRoutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      ) : null}
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes.publicRoutes)}
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
      {/* <Navigate to={{ pathname: "/authentication/sign-in", state: { from: location } }} /> */}
    </ThemeProvider>
  );
}
