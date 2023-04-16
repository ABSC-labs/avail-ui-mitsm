import Error403 from '../errorPages/Error403';
import React from 'react';
import HasRole from 'shared/helpers/keycloak/HasRole';

const WorkflowDashboard = React.lazy(() => import('./dashboard'));
const WorkflowApprovals = React.lazy(() => import('./approvals'));
const WorkflowApprovalsNAVMC11537 = React.lazy(() => import('./approvals/navmc11537'));
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
    path: '/workflows/approvals',
    element: (
      <HasRole {...['workflow']} fallback={<Error403 />}>
        <WorkflowApprovals />
      </HasRole>
    ),
  },
  {
    path: '/workflows/approvals/navmc-11537',
    element: (
      <HasRole {...['workflow']} fallback={<Error403 />}>
        <WorkflowApprovalsNAVMC11537 />
      </HasRole>
    ),
  },
];
