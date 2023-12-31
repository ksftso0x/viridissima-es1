/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.viridissima.es/product/material-kit-react
* Copyright 2021 viridissima.es (https://www.viridissima.es)

Coded by www.viridissima.es

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, /* Navigate, */useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React theme
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
// Material Kit 2 React routes
import routes from "routes";
import w3opts from "./web3-init";
import "./onboard.css";

const w3o = init(w3opts);
export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
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

  return (
    <Web3OnboardProvider web3Onboard={w3o}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          {/* <Route path="/presentation" element={<Presentation />} /> */}
          <Route path="*" element={<Presentation />} />
        </Routes>
      </ThemeProvider>
    </Web3OnboardProvider>
  );
}
