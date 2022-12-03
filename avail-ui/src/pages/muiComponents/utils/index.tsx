import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const ClickawayListener = React.lazy(() => import("./ClickawayListener"));
const Modal = React.lazy(() => import("./Modal"));
const NoSSR1 = React.lazy(() => import("./NoSSR1"));
const Popover = React.lazy(() => import("./Popover"));
const Popper = React.lazy(() => import("./Popper"));
const Portal = React.lazy(() => import("./Portal"));
const Transitions = React.lazy(() => import("./Transitions"));
const MediaQuery = React.lazy(() => import("./MediaQuery"));

export const utilConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/click-away-listener",
    element: <ClickawayListener />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/modal/",
    element: <Modal />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/NoSSR1/",
    element: <NoSSR1 />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/popover/",
    element: <Popover />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/popper/",
    element: <Popper />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/portal/",
    element: <Portal />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/transitions/",
    element: <Transitions />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/media-query/",
    element: <MediaQuery />,
  },
];
