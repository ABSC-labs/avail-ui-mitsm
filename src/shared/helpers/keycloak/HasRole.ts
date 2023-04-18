import { ReactNode } from 'react';
import useHasRole from './useHasRole.js';

const reservedPropNames = ['fallback', 'children', 'realm', 'resource'];

interface HasRoleProps {
  children: ReactNode;
  fallback?: ReactNode;
  roles?: { [index: number]: string };
}

const HasRole = ({ children, fallback, ...roles }: HasRoleProps) => {
  const roleValues = Object.values(roles);
  const filterReservePropNames = roleValues.filter((role) => !reservedPropNames.includes(role as string));
  const filterValue = filterReservePropNames.filter((role) => Boolean(role));
  const propRoles = filterValue.map((role) => role);

  return useHasRole(propRoles as string[]) ? (children as JSX.Element) : (fallback as JSX.Element);
};

export default HasRole;
