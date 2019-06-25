import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { history, persist, store } from './store';

ReactDOM.render((
        <Provider store={store}>
          <PersistGate loading={null} persistor={persist}>
            <ConnectedRouter history={history}>
              <Route component={App}/>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
    ), document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
