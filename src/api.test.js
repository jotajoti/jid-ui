import {disableFetchMocks, enableFetchMocks} from 'jest-fetch-mock';

import {Api} from './api';
import {act} from "@testing-library/react";

describe('api', () => {
    const api = new Api('https://example.com');

    beforeAll(() => {
        enableFetchMocks();
    });

    afterAll(() => {
        disableFetchMocks();
    });

    it('getStats correctly', async () => {
        const expectedStats = {
            countries: [{
                change: {
                    jids: 0,
                    position: 0
                },
                country: 'dk',
                jids: 1,
                position: 1
            }],
            totals: {
                jids: 1,
                countries: 1,
                unique: 1
            },
            users: [{
                countries: 1,
                jids: 1,
                name: 'John',
                position: 1
            }]
        };
        fetch.mockResponse(JSON.stringify(expectedStats));

        const actualStats = await api.getStats();
        expect(actualStats).toEqual(expectedStats);
    });
});
