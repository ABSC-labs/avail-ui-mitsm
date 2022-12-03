import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const BottomNavigation = React.lazy(() => import("./BottomNavigation"));
const Breadcrumbs = React.lazy(() => import("./Breadcrumbs"));
const Drawer = React.lazy(() => import("./Drawer"));
const Links = React.lazy(() => import("./Links"));
const Menu = React.lazy(() => import("./Menu"));
const Pagination = React.lazy(() => import("./Pagination"));
const SpeedDial = React.lazy(() => import("./SpeedDial"));
const Stepper = React.lazy(() => import("./Stepper"));
const Tabs = React.lazy(() => import("./Tabs"));

export const navigationConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/bottom-navigation",
    element: <BottomNavigation />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/breadcrumbs",
    element: <Breadcrumbs />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/drawers",
    element: <Drawer />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/links",
    element: <Links />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/menus",
    element: <Menu />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/pagination",
    element: <Pagination />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/speed-dial",
    element: <SpeedDial />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/steppers",
    element: <Stepper />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/tabs",
    element: <Tabs />,
  },
];
