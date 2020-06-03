export class Api {

    constructor(serverUrl) {
        this._serverUrl = serverUrl;
    }

    async getStats() {
        return fetch(this._getUrl('/stats')).then(response => response.json());
    }

    async createUser(name, username, password) {
        return fetch(this._getUrl('/createUser'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    name,
                    username,
                    password
                }
            )
        }).then(response => response.json());
    }

    async login(username, password) {
        return fetch(this._getUrl('/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username,
                    password
                }
            )
        }).then(response => response.json());
    }

    _getUrl(path) {
        return `${this._serverUrl}${path}`;
    }

}
