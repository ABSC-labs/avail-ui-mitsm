import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AuthRoutes from '@crema/utility/AuthRoutes';
import AppContextProvider from '@crema/utility/AppContextProvider';
import AppThemeProvider from '@crema/utility/AppThemeProvider';
import AppStyleProvider from '@crema/utility/AppStyleProvider';
import AppLocaleProvider from '@crema/utility/AppLocaleProvider';
import AppLayout from '@crema/core/AppLayout';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store';
import FirebaseAuthProvider from './@crema/services/auth/firebase/FirebaseAuthProvider';

const store = configureStore();

const items: string[] = ['test', 'test2'];

console.log(items);

function App() {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <BrowserRouter>
                <FirebaseAuthProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <AppLayout />
                  </AuthRoutes>
                </FirebaseAuthProvider>
              </BrowserRouter>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
      </Provider>
    </AppContextProvider>
  );
}

export default App;
