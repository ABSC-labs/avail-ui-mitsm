import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const Avatar = React.lazy(() => import("./Avatar"));
const Badges = React.lazy(() => import("./Badges"));
const Chips = React.lazy(() => import("./Chips"));
const Divider = React.lazy(() => import("./Divider"));
const Lists = React.lazy(() => import("./Lists"));
const Table = React.lazy(() => import("./Table"));
const Tooltip = React.lazy(() => import("./Tooltip"));

export const dataDisplayConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/avatars",
    element: <Avatar />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/badges",
    element: <Badges />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/chips",
    element: <Chips />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/divider",
    element: <Divider />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/lists",
    element: <Lists />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/tables",
    element: <Table />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/tooltip",
    element: <Tooltip />,
  },
];
