import 'dotenv';

const config = {
  keycloak: {
    KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
    KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  },
};

export default config;
