import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import LoggedInUserContextProvider from './helper/LoggedInUserContextProvider';
import NavbarContextProvider from './helper/NavbarContextProvider';
import ListItemsContextProvider from './helper/ListItemsContextProvider';
import DeviceDetectContextProvider from './helper/DeviceDetectContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoggedInUserContextProvider>
        <NavbarContextProvider>
          <ListItemsContextProvider>
            <DeviceDetectContextProvider>
              <App />
            </DeviceDetectContextProvider>
          </ListItemsContextProvider>
        </NavbarContextProvider>
      </LoggedInUserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
