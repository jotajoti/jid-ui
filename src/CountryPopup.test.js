import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from "react-leaflet";

import {CountryPopup} from './CountryPopup';

it('renders without crashing', () => {
    const stats = {
        countryMap: {
            dk: {}
        }
    };
    const hoveredCountry = {
        feature: {
            id: 'DNK'
        }
    };

    const leaflet = {
        map: {
            openPopup: () => {
            },
        }
    };

    const div = document.createElement('div');
    ReactDOM.render(<Map><CountryPopup stats={stats} hoveredCountry={hoveredCountry} leaflet={leaflet}/></Map>, div);
});
