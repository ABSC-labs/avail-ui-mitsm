import React from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";

const Flat = React.lazy(() => import("./Flat"));
const Morden = React.lazy(() => import("./Morden"));
const Standard = React.lazy(() => import("./Standard"));

export const userListConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/list-type/flat",
    element: <Flat />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/list-type/morden",
    element: <Morden />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/list-type/standard",
    element: <Standard />,
  },
];
