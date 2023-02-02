import * as kc from '@crema/services/auth/keycloak/keycloak';

export default function useCurrentUser() {
  return kc.getKeycloak().idTokenParsed;
}
