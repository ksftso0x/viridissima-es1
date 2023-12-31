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

/**
  The linearGradient() function helps you to create a linear gradient color background
 */

function linearGradient(color, colorState, angle = 195) {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export default linearGradient;
