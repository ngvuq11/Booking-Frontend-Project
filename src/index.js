import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import '../src/assets/styles/styles.scss';
import IntlProviderWrapper from './auth/IntlProviderWrapper';
import App from './containers/App';
import reduxStore, { persistor } from './redux';
import * as serviceWorker from './serviceWorker';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor} />
      </IntlProviderWrapper>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
