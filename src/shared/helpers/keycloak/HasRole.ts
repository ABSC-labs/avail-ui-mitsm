import type { RoleOrRolesMaybe } from './index.js';
import useHasRole from './useHasRole.js';
import * as kc from '@crema/services/auth/keycloak/keycloak';

const reservedPropNames = ['fallback', 'children', 'realm', 'resource'];

const HasRole = ({ children, fallback, test, realm, resource, ...roles }) => {
  console.log(test);
  const propRoles = Object.entries(roles)
    .filter(([role]) => !reservedPropNames.includes(role))
    .filter(([, value]) => Boolean(value))
    .map(([role]) => role)
    .map((role) =>
      reservedPropNames.some((propName) => role.startsWith(propName))
        ? // "fallbackRole" ==> "fallback"
          role.slice(0, -4)
        : role,
    );

  const toArray = (value: RoleOrRolesMaybe, getUnknown: () => unknown) => {
    const arr: [string] | unknown = value
      ? typeof value === 'string'
        ? [value, ...propRoles]
        : Array.isArray(value)
        ? [...value, propRoles]
        : getUnknown()
      : propRoles;

    return arr ? (arr as [string]).map((k: string) => roles[k]) : getUnknown();
  };

  const keycloak = kc.getKeycloak();

  const realmAndResourceRoles = {
    realm: toArray(realm, () => propRoles),
    resource: toArray(resource, () =>
      keycloak.clientId
        ? {
            ...resource,
            [keycloak.clientId]: toArray(resource[keycloak.clientId], () => propRoles),
          }
        : resource,
    ),
  };

  return useHasRole(realmAndResourceRoles) ? children : fallback;
};

export default HasRole;
