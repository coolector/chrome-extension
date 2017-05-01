'use strict';

const ItemRepository = require('../entity/itemRepository').ItemRepository;
const UserRepository = require('../entity/userRepository').UserRepository;

const Plugin = class {

    constructor() {
        this.name = null;
        this.description = null;
        this.version = null;
        this.logo = null;
        this.url = null;
        this.api_url = null;
        this.enable = false;
        this.collectors = [];
        this.itemRepository = null;
        this.userRepository = null;
    }

    /**
     * Return item repository
     *
     * @returns {ItemRepository|null}
     */
    getItemRepository() {
        if (!this.itemRepository) {
            this.itemRepository = new ItemRepository(this.api_url);
        }

        return this.itemRepository;
    }

    /**
     * Return user repository
     *
     * @returns {null|UserRepository}
     */
    getUserRepository() {
        if (!this.userRepository) {
            this.userRepository = new UserRepository(this.api_url);
        }

        return this.userRepository;
    }
};

module.exports = {
    Plugin: Plugin
};