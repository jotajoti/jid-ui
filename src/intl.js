import React from 'react';
import {I18nProvider} from "@lingui/react";
import da from './locales/da/messages';

export const Intl = props => {
    const usersLocale = navigator.language;

    const catalogs = {
        da
    };

    return (
        <I18nProvider language={usersLocale} catalogs={catalogs}>
            {props.children}
        </I18nProvider>
    );
};
