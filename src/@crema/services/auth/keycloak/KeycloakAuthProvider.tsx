import { ReactKeycloakProvider } from '@react-keycloak/web';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthUser } from 'types/models/AuthUser';
import * as keycloak from './keycloak';

interface KeycloakContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface KeycloakActionsProps {
  logout: () => void;
}

const KeycloakContext = createContext<KeycloakContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

const KeycloakActionsContext = createContext<KeycloakActionsProps>({
  logout: () => {},
});

export const useKeycloak = () => useContext(KeycloakContext);

export const useKeycloakActions = () => useContext(KeycloakActionsContext);

interface KeycloakAuthProviderProps {
  children: ReactNode;
}

const KeycloakAuthProvider: React.FC<KeycloakAuthProviderProps> = ({ children }) => {
  const [keycloakData, setKeycloakData] = useState<KeycloakContextProps>({
    user: undefined,
    isLoading: true,
    isAuthenticated: false,
  });

  const keycloakInstance = keycloak.getKeycloak()

  useEffect(() => {
    keycloakInstance
      .init({ onLoad: "login-required" })
      .then(function (authenticated) {
        setKeycloakData({
          user: keycloakData.user,
          isAuthenticated: authenticated,
          isLoading: false,
        });

        setInterval(() => {
          keycloakInstance.updateToken(70).then((refreshed) => {
            if (refreshed) {
              console.info('Token refreshed ' + refreshed);
            }
            // else {
            //   console.warn('Token not refreshed, valid for '
            //     + Math.round((keycloakInstance.tokenParsed?.exp ?? 0) + (keycloakInstance.timeSkew ?? 0) - new Date().getTime() / 1000) + ' seconds');
            // }
          }).catch(() => {
            console.error('Failed to refresh token');
          });
        }, 6000)
      })
      .catch((e) => {
        setKeycloakData({
          user: keycloakData.user,
          isLoading: false,
          isAuthenticated: false,
        });
      });
  }, [keycloakData.user]);

  const logout = async () => {
    setKeycloakData({ ...keycloakData, isLoading: true });
    try {
      await keycloak.getKeycloak().logout();
      setKeycloakData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setKeycloakData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <KeycloakContext.Provider
      value={{
        ...keycloakData,
      }}
    >
      <KeycloakActionsContext.Provider
        value={{
          logout,
        }}
      >
        {children}
      </KeycloakActionsContext.Provider>
    </KeycloakContext.Provider>
  );
};

export default KeycloakAuthProvider;