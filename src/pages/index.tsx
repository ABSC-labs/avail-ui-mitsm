import { initialUrl } from 'shared/constants/AppConst';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authRouteConfig } from './auth';
import Error403 from './errorPages/Error403';
import { errorPagesConfigs } from './errorPages';
import { samplePagesConfigs } from './sample';
import { profilePage } from './profile';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [...samplePagesConfigs, ...profilePage],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: [
    ...authRouteConfig,
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
  ],
};

const anonymousStructure = {
  routes: errorPagesConfigs,
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
