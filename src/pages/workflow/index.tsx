import Error403 from '../errorPages/Error403';
import React from 'react';
import HasRole from 'shared/helpers/keycloak/HasRole';
import WorkflowRELMs from './relms';

const WorkflowDashboard = React.lazy(() => import('./dashboard'));
const WorkflowApprovals = React.lazy(() => import('./approvals'));
export const workflowPagesConfigs = [
  {
    path: '/workflows/dashboard',
    element: (
      <HasRole {...['workflow']} fallback={<Error403 />}>
        <WorkflowDashboard />
      </HasRole>
    ),
  },
  {
    path: '/workflows/relms',
    element: (
      <HasRole {...['workflow']} fallback={<Error403 />}>
        <WorkflowRELMs />
      </HasRole>
    ),
  },
  {
    path: '/workflows/approvals',
    element: (
      <HasRole {...['workflow']} fallback={<Error403 />}>
        <WorkflowApprovals />
      </HasRole>
    ),
  },
];
