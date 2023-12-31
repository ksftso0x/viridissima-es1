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

// Material Kit 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

const { grey } = colors;
const { size } = typography;

export default {
  styleOverrides: {
    li: {
      lineHeight: 0,
    },

    separator: {
      fontSize: size.sm,
      color: grey[600],
    },
  },
};
