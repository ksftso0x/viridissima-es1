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

// Material Kit 2 React helper functions
import rgba from "assets/theme/functions/rgba";

const { info, white, gradients } = colors;

export default {
  ".flatpickr-day:hover, .flatpickr-day:focus, .flatpickr-day.nextMonthDay:hover, .flatpickr-day.nextMonthDay:focus":
    {
      background: rgba(info.main, 0.28),
      border: "none",
    },

  ".flatpickr-day.today": {
    background: info.main,
    color: white.main,
    border: "none",

    "&:hover, &:focus": {
      background: `${info.focus} !important`,
    },
  },

  ".flatpickr-day.selected, .flatpickr-day.selected:hover, .flatpickr-day.nextMonthDay.selected, .flatpickr-day.nextMonthDay.selected:hover, .flatpickr-day.nextMonthDay.selected:focus":
    {
      background: `${gradients.info.state} !important`,
      color: white.main,
      border: "none",
    },

  ".flatpickr-months .flatpickr-next-month:hover svg, .flatpickr-months .flatpickr-prev-month:hover svg":
    {
      color: `${info.main} !important`,
      fill: `${info.main} !important`,
    },
};
