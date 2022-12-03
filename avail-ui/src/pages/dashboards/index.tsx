import React from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";

const HealthCare = React.lazy(() => import("./HealthCare"));
const ECommerce = React.lazy(() => import("./ECommerce"));
const CRM = React.lazy(() => import("./CRM"));
const Crypto = React.lazy(() => import("./Crypto"));
const Analytics = React.lazy(() => import("./Analytics"));
const Academy = React.lazy(() => import("./Academy"));
const Metrics = React.lazy(() => import("./Metrics"));
const Widgets = React.lazy(() => import("./Widgets"));

export const dashboardConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/health-care",
    element: <HealthCare />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/e-commerce",
    element: <ECommerce />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/crm",
    element: <CRM />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/crypto",
    element: <Crypto />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/analytics",
    element: <Analytics />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/academy",
    element: <Academy />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/metrics",
    element: <Metrics />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/widgets",
    element: <Widgets />,
  },
];
