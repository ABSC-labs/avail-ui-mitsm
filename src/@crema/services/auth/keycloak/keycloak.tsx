import Keycloak from 'keycloak-js';
import appConfig from '../../../../config';

// Setup client
export let keycloak: Keycloak;

/**
 * Get the keycloak instance
 * @returns {Keycloak}
 */
export function getKeycloak() {
  if (!keycloak) {
    const url = appConfig.keycloak.KEYCLOAK_URL;
    const realm = appConfig.keycloak.KEYCLOAK_REALM;
    const clientId = appConfig.keycloak.KEYCLOAK_CLIENT_ID;

    if (!url) {
      throw new Error('There is no Keycloak URL configured');
    }
    if (!realm) {
      throw new Error('There is no Keycloak Realm configured');
    }
    if (!clientId) {
      throw new Error('There is no Keycloak Client ID configured');
    }
    if (!keycloak) {
      keycloak = new Keycloak({
        url: url,
        realm: realm,
        clientId: clientId,
      });
    }
  }
  return keycloak;
}
