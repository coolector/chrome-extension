'use strict';

import ItemRepository from '../entity/ItemRepository';
import UserRepository from '../entity/UserRepository';

/**
 * Plugin
 */
export default class Plugin {

    constructor() {
        this.id = null;
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

    /**
     * Find collectors that match a certain URL
     *
     * @param url
     * @returns {Array.<*>}
     */
    findCollectors(url = null) {
        let collectors = this.collectors.filter(function (collector) {
            let reg = new RegExp(collector.domain, 'i');
            return !url || url.match(reg) !== false;
        });

        collectors.sort(function (a, b) {
            if (a.parent == b.parent) {
                return a.weight - b.weight;
            }
            else {
                // Parent selector should select first
                if (a.id == b.parent) {
                    return -1;
                }
                // Parent selector should select first
                if (b.id == a.parent) {
                    return 1;
                }

                // If no relationship then they are equal
                return 0;
            }
        });

        return collectors;
    }
};
