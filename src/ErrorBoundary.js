import React from "react";
import * as Sentry from '@sentry/react';

const FallbackComponent = () => {
    return (
        <div>An error has occurred</div>
    );
}

export const ErrorBoundary = ({children}) => {
    return (
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
            {children}
        </Sentry.ErrorBoundary>
    );
}
