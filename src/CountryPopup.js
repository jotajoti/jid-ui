import React from "react";
import {Popup} from "react-leaflet";
import {translateCountryCode} from "./translateCountryCode";
import iso3to2 from "country-iso-3-to-2";

export const CountryPopup = ({stats, hoveredCountry: {feature}}) => {
    const countryCode = iso3to2(feature.id);
    const translatedCountryCode = translateCountryCode(countryCode);
    const countryStats = stats.countryMap[countryCode.toLowerCase()];

    let countryJidCount = 0;
    if (countryStats) {
        countryJidCount = countryStats.jids;
    }

    return <Popup closeButton={false}>{translatedCountryCode} {countryJidCount}</Popup>
};
