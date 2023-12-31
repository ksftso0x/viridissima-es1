/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.viridissima.es/product/material-kit-react
* Copyright 2021 viridissima.es (https://www.viridissima.es)

Coded by www.viridissima.es

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// prop-types is a library for type checking of props
import PropTypes from "prop-types";

// react-copy-to-clipboard components
// import { CopyToClipboard } from "react-copy-to-clipboard";

// react-syntax-highlighter components
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

// @mui material components
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Slide from "@mui/material/Slide";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKAlert from "components/MKAlert";
// import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React base styles
// import colors from "assets/theme/base/colors";

function View2({ children, title, height, ...rest }) {
  // const { grey } = colors;

  // const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);

  // const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  return (
    <MKBox className="fuckoff" style={{border: "2px solid red", overflowY: "hidden"}}
      width="100%"
      position="relative"
      borderRadius="xl"
      shadow="lg"
      mb={12}
      sx={{ overflow: "hidden" }}
      {...rest}
    >
      <MKBox
        px={3}
        sx={{
          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
            `${borderWidth[1]} solid ${borderColor}`,
        }}
      >
        <Grid container spacing={0} justifyContent="space-between" py={0}>
          <Grid item xs={12} lg={8}>
            <MKTypography variant="body1" pt={0.5}>
              {title}
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <AppBar position="static" />
          </Grid>
        </Grid>
      </MKBox>
      <MKBox>
        <MKBox width="100%" p={0}>
          <MKBox className="fuckoff" style={{overflow: "hidden"}}
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: "hidden", overflowY: "scroll" }}
          >
            {children}
          </MKBox>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the View
View2.defaultProps = {
  height: "auto",
};

// Typechecking props for the View
View2.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
};

export default View2;
