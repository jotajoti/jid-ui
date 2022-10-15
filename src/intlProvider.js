import React from 'react';
import {I18nProvider} from "@lingui/react";
import da from './locales/da/messages';

export const IntlProvider = props => {
    console.log('navigator.language: '+navigator.language);
    const usersLocale = 'da';

    const catalogs = {
        da
    };

    return (
        <I18nProvider language={usersLocale} catalogs={catalogs}>
            {props.children}
        </I18nProvider>
    );
};
