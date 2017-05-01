'use strict';

const $ = require('jquery');
const AbstractRepository = require('./abstractRepository').AbstractRepository;
const User = require('./user').User;

const UserRepository = class extends AbstractRepository {

    constructor(apiUrl) {
        super();
        this._url = apiUrl;
        this._relativeUrl = 'user';
    };

    /**
     * Get current authenticated user
     * @param callback
     */
    getUser(callback) {
        let url = `${this._url}/${this._relativeUrl}`;
        $.ajax({
            url: url,
            success: (data) => {
                let user = new User();
                user.email = data.email;
                callback(user);
            },
            error: () => {
                callback(null);
            },
            dataType: 'json'
        });
    }
};

module.exports = {
    UserRepository: UserRepository
}

