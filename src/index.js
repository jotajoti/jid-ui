import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from "./intlProvider";
import {ErrorBoundary} from "./ErrorBoundary";

Sentry.init({
    dsn: "https://408b21bcf70f4cc8a3e0bc6cfa5975fa@sentry.billestauner.dk/2",
    release: `jid-ui@${process.env.REACT_APP_JID_UI_VERSION ? process.env.REACT_APP_JID_UI_VERSION : 'local'}`,
    environment: process.env.REACT_APP_JID_UI_PROD_ENVIRONMENT ? 'prod' : 'dev',
});

ReactDOM.render(<IntlProvider><ErrorBoundary><App/></ErrorBoundary></IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
