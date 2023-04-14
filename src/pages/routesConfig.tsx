import React, { ReactNode } from 'react';
import { BiAlignLeft } from 'react-icons/bi';
import { RoutePermittedRole } from '../shared/constants/AppConst';

export interface RouterConfigData {
  id: string;
  role: [string];
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesConfig: RouterConfigData[] = [
  {
    id: 'app',
    role: ['user'],
    title: 'Workflow',
    messageId: 'sidebar.workflow',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        role: ['workflow'],
        title: 'Dashboard',
        messageId: 'sidebar.workflow.dashboard',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/workflows/dashboard',
      },
      {
        id: 'approvals',
        role: ['workflow'],
        title: 'Approvals',
        messageId: 'sidebar.workflow.approvals',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/workflows/approvals',
      },
    ],
  },
];
export default routesConfig;
