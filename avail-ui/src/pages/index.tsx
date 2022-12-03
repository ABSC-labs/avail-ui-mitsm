import React from "react";
import { initialUrl } from "../shared/constants/AppConst";

import { authRouteConfig } from "./auth";
import Error403 from "./errorPages/Error403";
import { errorPagesConfigs } from "./errorPages";
import { dashboardConfig } from "./dashboards";
import { extraPagesConfigs } from "./extraPages";
import { ecommerceConfig } from "./ecommerce";
import { userListConfig } from "./userList";
import { userPagesConfig } from "./userPages";
// import { muiComponentConfigs } from "./muiComponents";
// import { thirdPartyConfigs } from "./thirdParty";
import { appsConfig } from "./apps";
import Error404 from "./errorPages/Error404";

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashboardConfig,
    ...appsConfig,
    // ...thirdPartyConfigs,
    ...extraPagesConfigs,
    ...ecommerceConfig,
    // ...muiComponentConfigs,
    ...userPagesConfig,
    ...userListConfig,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: "*",
      element: <Error404 />,
    },
  ]),
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
