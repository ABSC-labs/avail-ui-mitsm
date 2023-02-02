import { KeycloakResourceAccess, KeycloakRoles } from 'keycloak-js';

export interface AuthUser {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string;
  azp?: string;
  session_state?: string;
  realm_access?: KeycloakRoles;
  resource_access?: KeycloakResourceAccess;
  [key: string]: unknown; // Add other attributes here.
  // ------
  id?: number;
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: string[] | string;
}
