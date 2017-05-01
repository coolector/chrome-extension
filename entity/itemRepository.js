'use strict';

const $ = require('jquery');
const AbstractRepository = require('./abstractRepository').AbstractRepository;
const Item = require('./item').Item;

const ItemRepository = class extends AbstractRepository {
    constructor(apiUrl) {
        super();
        this._url = apiUrl;
        this._relativeUrl = 'items';
    };

    /**
     *
     * @param item
     */
    save(item) {

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

module.exports = {
    ItemRepository: ItemRepository
};
