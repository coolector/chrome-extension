'use strict';

const $ = require('jquery');
import AbstractRepository from './AbstractRepository';
import User from './User';

/**
 * UserRepository
 */
export default class UserRepository extends AbstractRepository {

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

