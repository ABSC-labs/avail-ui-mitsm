import { RoutePermittedRole } from "../../../shared/constants/AppConst";
import React from "react";

const DatePicker = React.lazy(() => import("./DatePicker"));
const DateRangePicker = React.lazy(() => import("./DateRangePicker"));
const DateTimePicker = React.lazy(() => import("./DateTimePicker"));
const TimePicker = React.lazy(() => import("./TimePicker"));
const Masonry = React.lazy(() => import("./Masonry"));
const Timeline = React.lazy(() => import("./Timeline"));
const TrapFocus = React.lazy(() => import("./TrapFocus"));
const TreeView = React.lazy(() => import("./TreeView"));
export const labConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/date-picker",
    element: <DatePicker />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/date-range-picker",
    element: <DateRangePicker />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/date-time-picker",
    element: <DateTimePicker />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/time-picker",
    element: <TimePicker />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/masonry",
    element: <Masonry />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/timeline",
    element: <Timeline />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/trap-focus",
    element: <TrapFocus />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/lab/tree-view",
    element: <TreeView />,
  },
];
