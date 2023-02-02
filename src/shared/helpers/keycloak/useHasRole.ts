import * as kc from '@crema/services/auth/keycloak/keycloak';

export default function useHasRole(roles: string[]) {
  const keycloak = kc.getKeycloak();

  const hasRoles = roles.map((role) => keycloak.hasRealmRole(role));

  for (let i = 0; i < hasRoles.length; i++) {
    if (hasRoles[i]) {
      return true;
    }
  }
}
