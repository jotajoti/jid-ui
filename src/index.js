import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/apm';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from "./intlProvider";
import {ErrorBoundary} from "./ErrorBoundary";

Sentry.init({
    dsn: "https://cc1f390153954faaa2eade57698875c7@sentry.billestauner.dk/2",
    release: `jid-ui@${process.env.REACT_APP_JID_UI_VERSION ? process.env.REACT_APP_JID_UI_VERSION : 'local'}`,
    environment: process.env.REACT_APP_JID_UI_PROD_ENVIRONMENT ? 'prod' : 'dev',
    integrations: [
        new Integrations.Tracing(),
    ],
    tracesSampleRate: 1.0,
});

ReactDOM.render(<IntlProvider><ErrorBoundary><App/></ErrorBoundary></IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
