import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const AutoComplete = React.lazy(() => import("./AutoComplete"));
const Buttons = React.lazy(() => import("./Buttons"));
const ButtonGroup = React.lazy(() => import("./ButtonGroup"));
const Checkboxes = React.lazy(() => import("./Checkboxes"));
const FloatingActionButton = React.lazy(() => import("./FloatingActionButton"));
const Radio = React.lazy(() => import("./Radio"));
const Rating = React.lazy(() => import("./Rating"));
const Selects = React.lazy(() => import("./Selects"));
const Slider = React.lazy(() => import("./Slider"));
const Switches = React.lazy(() => import("./Switches"));
const TextField = React.lazy(() => import("./TextField"));
const TransferList = React.lazy(() => import("./TransferList"));
const ToggleButtons = React.lazy(() => import("./ToggleButtons"));

export const inputsConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/autocomplete",
    element: <AutoComplete />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/buttons",
    element: <Buttons />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/button-group",
    element: <ButtonGroup />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/checkboxes",
    element: <Checkboxes />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/floating-action-button",
    element: <FloatingActionButton />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/radios",
    element: <Radio />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/rating",
    element: <Rating />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/selects",
    element: <Selects />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/slider",
    element: <Slider />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/switches",
    element: <Switches />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/text-fields",
    element: <TextField />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/transfer-list",
    element: <TransferList />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/toggle-buttons",
    element: <ToggleButtons />,
  },
];
