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
 All of the routes for the Material Kit 2 React React are added here,
 You can add a new route, customize the routes and delete the routes here.

 Once you add a new route on this file it will be visible automatically on
 the Navbar.

 For adding a new route you can follow the existing routes in the routes array.
 1. The `name` key is used for the name of the route on the Navbar.
 2. The `icon` key is used for the icon of the route on the Navbar.
 3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
 inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
 4. The `route` key is used to store the route location which is used for the react router.
 5. The `href` key is used to store the external links location.
 6. The `component` key is used to store the component of its route.
 7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
 8. The `description` key is used to define the description of
 a route under its name.
 9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
 you can set the columns amount based on this key.
 10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
 */

// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
// import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
// import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";

// Sections
// import PageHeaders from "layouts/sections/page-sections/page-headers";
// import Features from "layouts/sections/page-sections/featuers";
// import Navbars from "layouts/sections/navigation/navbars";
// import NavTabs from "layouts/sections/navigation/nav-tabs";
// import Pagination from "layouts/sections/navigation/pagination";
// import Inputs from "layouts/sections/input-areas/inputs";
// import Forms from "layouts/sections/input-areas/forms";
// import Alerts from "layouts/sections/attention-catchers/alerts";
// import Modals from "layouts/sections/attention-catchers/modals";
// import TooltipsPopovers from "layouts/sections/attention-catchers/tooltips-popovers";
// import Avatars from "layouts/sections/elements/avatars";
// import Badges from "layouts/sections/elements/badges";
// import BreadcrumbsEl from "layouts/sections/elements/breadcrumbs";
// import Buttons from "layouts/sections/elements/buttons";
// import Dropdowns from "layouts/sections/elements/dropdowns";
// import ProgressBars from "layouts/sections/elements/progress-bars";
// import Toggles from "layouts/sections/elements/toggles";
// import Typography from "layouts/sections/elements/typography";
import {Navigate} from "react-router-dom";
import FTSOOptions from "./layouts/sections/page-sections/ftso";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "about us",
            route: "/pages/landing-pages/about-us",
            component: <AboutUs />,
          },
          {
            name: "contact us",
            route: "/pages/landing-pages/contact-us",
            component: <ContactUs />,
          },
          // {
          //   name: "author",
          //   route: "/pages/landing-pages/author",
          //   component: <Author />,
          // },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
          },
        ],
      },
    ],
  },
  {
    name: "FTSO",
    icon: <Icon>article</Icon>,
    collapse: [
      // {
      //   name: "Connect Wallet",
      //   // route: "/sections/page-sections/page-headers",
      //   // component: <PageHeaders />,
      // },
      {
        name: "Wrap/Unwrap",
        route: "/ftso/wrap",
        component: <FTSOOptions sec="wrap" />,
      },
      {
        name: "Delegate",
        route: "/ftso/providers",
        component: <FTSOOptions sec="prov" />,
      },
      {
        name: "Claim Rewards",
        route: "/ftso/claimRewards",
        component: <FTSOOptions sec="rewa" />,
      },
      {
        name: "Help",
        route: "/ftso/help",
        component: <FTSOOptions sec="help" />,
      },
    ],
  },

  // {
  //   name: "sections",
  //   icon: <Icon>view_day</Icon>,
  //   collapse: [
  //     // {
  //     //   name: "FTSO",
  //     //   description: "Delegate or Claim from FTSOs",
  //     //   dropdown: true,
  //     //   collapse: [],
  //     // },
      {
        name: "Our Services",
        icon: <Icon>view_day</Icon>,
        // description: "Services and Products",
        // dropdown: true,
        collapse: [
          {
            name: "NFT Marketplace",
            description: "Buy, Sell and Create NFTs",
            href: "https://nft.viri.uk",
          },
          {
            name: "NeoSwap",
            description: "Cross-chain decentralized exchange (WIP)",
            route: "/services/dex",
            component: <Navigate to="/" />,
          },
          {
            name: "GreenBridge",
            description: "Wrap assets from other blockchains onto SGB and FLR (WIP)",
            route: "/services/bridge",
            component: <Navigate to="/" />,
          },
          {
            name: "Consultancy",
            description: "Bespoke crypto software solutions ",
            route: "/services/consult",
            component: <Navigate to="/" />,
          },
          {
            name: "Help",
            route: "/services/help",
            component: <Navigate to="/" />,
          },
      //   ],
      // },
      // {
      //   name: "navigation",
      //   description: "See all navigations",
      //   dropdown: true,
      //   collapse: [
      //     {
      //       name: "navbars",
      //       route: "/sections/navigation/navbars",
      //       component: <Navbars />,
      //     },
      //     {
      //       name: "nav tabs",
      //       route: "/sections/navigation/nav-tabs",
      //       component: <NavTabs />,
      //     },
      //     {
      //       name: "pagination",
      //       route: "/sections/navigation/pagination",
      //       component: <Pagination />,
      //     },
      //   ],
      // },
      // {
      //   name: "input areas",
      //   description: "See all input areas",
      //   dropdown: true,
      //   collapse: [
      //     {
      //       name: "inputs",
      //       route: "/sections/input-areas/inputs",
      //       component: <Inputs />,
      //     },
      //     {
      //       name: "forms",
      //       route: "/sections/input-areas/forms",
      //       component: <Forms />,
      //     },
      //   ],
      // },
      // {
      //   name: "attention catchers",
      //   description: "See all examples",
      //   dropdown: true,
      //   collapse: [
      //     {
      //       name: "alerts",
      //       route: "/sections/attention-catchers/alerts",
      //       component: <Alerts />,
      //     },
      //     {
      //       name: "modals",
      //       route: "/sections/attention-catchers/modals",
      //       component: <Modals />,
      //     },
      //     {
      //       name: "tooltips & popovers",
      //       route: "/sections/attention-catchers/tooltips-popovers",
      //       component: <TooltipsPopovers />,
      //     },
      //   ],
      // },
      // {
      //   name: "elements",
      //   description: "See all 32 examples",
      //   dropdown: true,
      //   collapse: [
      //     {
      //       name: "avatars",
      //       route: "/sections/elements/avatars",
      //       component: <Avatars />,
      //     },
      //     {
      //       name: "badges",
      //       route: "/sections/elements/badges",
      //       component: <Badges />,
      //     },
      //     {
      //       name: "breadcrumbs",
      //       route: "/sections/elements/breadcrumbs",
      //       component: <BreadcrumbsEl />,
      //     },
      //     {
      //       name: "buttons",
      //       route: "/sections/elements/buttons",
      //       component: <Buttons />,
      //     },
      //     {
      //       name: "dropdowns",
      //       route: "/sections/elements/dropdowns",
      //       component: <Dropdowns />,
      //     },
      //     {
      //       name: "progress bars",
      //       route: "/sections/elements/progress-bars",
      //       component: <ProgressBars />,
      //     },
      //     {
      //       name: "toggles",
      //       route: "/sections/elements/toggles",
      //       component: <Toggles />,
      //     },
      //     {
      //       name: "typography",
      //       route: "/sections/elements/typography",
      //       component: <Typography />,
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "docs",
    icon: <Icon>article</Icon>,
  //   collapse: [
  //     {
  //       name: "getting started",
  //       description: "All about overview, quick start, license and contents",
  //       href: "https://www.viridissima.es/learning-lab/react/quick-start/material-kit/",
  //     },
  //     {
  //       name: "foundation",
  //       description: "See our colors, icons and typography",
  //       href: "https://www.viridissima.es/learning-lab/react/colors/material-kit/",
  //     },
  //     {
  //       name: "components",
  //       description: "Explore our collection of fully designed components",
  //       href: "https://www.viridissima.es/learning-lab/react/alerts/material-kit/",
  //     },
  //     {
  //       name: "plugins",
  //       description: "Check how you can integrate our plugins",
  //       href: "https://www.viridissima.es/learning-lab/react/datepicker/material-kit/",
  //     },
  //   ],
  },
  {
    name: "Forum",
    icon: <Icon>view_night</Icon>,
    description: "Discuss at length on the forum",
  //   icon: <GitHubIcon />,
     href: "https://f.viridissima.es",
   },
];

export default routes;
