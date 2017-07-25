'use strict';

const $ = require('jquery');
import AbstractRepository from './AbstractRepository';
import Item from './Item';

export default class extends AbstractRepository {
    constructor(apiUrl) {
        super();
        this._url = apiUrl;
        this._relativeUrl = 'items';

        // this._url = 'https://requestb.in';
        // this._relativeUrl = '1ate2um1';
    };

    /**
     *
     * @param item
     */
    save(item, callback) {
        let url = `${this._url}/${this._relativeUrl}`;
        $.post({
            url: url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(item),
            success: (data) => {
                let item = new Item();
                item.id = data.id
                callback(item);
            },
            dataType: 'json'
        });
    }

    /**
     *
     * @param id
     */
    load(id, callback) {
        let url = `${this._url}/${this._relativeUrl}/${id}`;
        $.ajax({
            url: url,
            success: (data) => {
                let item = new Item();
                item.id = data.id
                callback(item);
            },
            dataType: 'json'
        });
    }

    /**
     *
     * @param search
     * @param tags
     * @param limit
     * @param offset
     * @param sort
     */
    list(search, tags = Array(0), limit = 10, offset = 0, sort = null) {

    }

};
