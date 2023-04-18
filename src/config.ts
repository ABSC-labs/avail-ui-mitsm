const config = {
  keycloak: {
    KEYCLOAK_SERVICE_PROTOCOL: process.env.KEYCLOAK_SERVICE_PROTOCOL,
    KEYCLOAK_SERVICE_HOST: process.env.KEYCLOAK_SERVICE_HOST,
    KEYCLOAK_SERVICE_PORT: process.env.KEYCLOAK_SERVICE_PORT,
    KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  },
};

export default config;
