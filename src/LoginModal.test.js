import React from 'react';
import {render} from '@testing-library/react';

import {LoginButton} from './LoginModal';

describe('LoginButton', () => {
    it('renders without crashing', () => {
        const {getByText} = render(<LoginButton/>);
        const loginButtonText = getByText('Login');
        expect(loginButtonText).toBeInTheDocument();
    });
});
