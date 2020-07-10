export class Api {

    constructor(serverUrl) {
        this._serverUrl = serverUrl;
    }

    async getStats() {
        return fetch(this._getUrl('/stats')).then(response => response.json());
    }

    async createUser(name, username, password) {
        const body = {
            name,
            username,
            password
        };
        const request = this._createPostRequest(body);
        return fetch(this._getUrl('/createUser'), request).then(response => response.json());
    }

    async login(username, password) {
        const body = {
            username,
            password
        };
        const request = this._createPostRequest(body);

        return fetch(this._getUrl('/login'), request).then(response => response.json());
    }

    async addJidCode(jidCode) {
        const body = {
            jid: jidCode.toLowerCase()
        };
        const extraHeaders = {
            Authorization: localStorage.getItem('token')
        };
        const request = this._createPostRequest(body, extraHeaders);

        return fetch(this._getUrl('/jid'), request).then(response => response.json());
    }

    _createPostRequest(body, extraHeaders) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (extraHeaders) {
            Object.assign(headers, extraHeaders);
        }

        return {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        };
    }

    _getUrl(path) {
        return `${this._serverUrl}${path}`;
    }

}
