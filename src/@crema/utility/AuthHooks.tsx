import { useKeycloak, useKeycloakActions } from '../services/auth/keycloak/KeycloakAuthProvider';
import { getUserFromKeycloak } from './helper/AuthHelper';

export const useAuthUser = () => {
  const { isAuthenticated, isLoading } = useKeycloak();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromKeycloak(),
  };
};

export const useAuthMethod = () => {
  const { logout } = useKeycloakActions();

  return {
    logout,
  };
};
