import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {Intl} from "./intl";

Sentry.init({dsn: "https://73832ea57a124280a31e284c12c71f19@o416351.ingest.sentry.io/5310749"});

ReactDOM.render(<Intl><App/></Intl>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
