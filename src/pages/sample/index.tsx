import Error403 from '../errorPages/Error403';
import React from 'react';
import HasRole from 'shared/helpers/keycloak/HasRole';

const Page1 = React.lazy(() => import('./Page1'));
const Page2 = React.lazy(() => import('./Page2'));
const Page3 = React.lazy(() => import('./Page3'));
export const samplePagesConfigs = [
  {
    path: '/sample/page-1',
    element: <Page1 />,
  },
  {
    path: '/sample/page-2',
    element: <Page2 />,
  },
  {
    path: '/sample/page-3',
    element: (
      <HasRole {...['admin']} fallback={<Error403 />}>
        <Page3 />
      </HasRole>
    ),
  },
];
