import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const Box = React.lazy(() => import("./Box"));
const Container = React.lazy(() => import("./Container"));
const Grid = React.lazy(() => import("./Grid"));
const Stack = React.lazy(() => import("./Stack"));
const ImageList = React.lazy(() => import("./ImageList"));

export const layoutConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/box",
    element: <Box />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/container",
    element: <Container />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/Grid",
    element: <Grid />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/Stack",
    element: <Stack />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/Image-list",
    element: <ImageList />,
  },
];
