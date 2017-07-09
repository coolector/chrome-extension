'use strict';

import PluginParser from './PluginParser';
const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Persist and load collectors available
 *
 * @type {PluginRepository}
 */
export default class PluginRepository {

    constructor(enforcer) {
        this.plugins = [];
        this.load();
        if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
    }

    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new PluginRepository(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * Add new plugin to the stack based on plugin
     *
     * @param plugin
     * @returns {*}
     */
    addPlugin(plugin) {
        let found = this.plugins.find(function (item) {
            return item.id == plugin.id;
        });

        if (!found) {
            this.plugins.push(plugin);
        }
    }

    /**
     * Find plugins that can handle current URL
     * @param url
     */
    findPlugins(url = null) {
        return this.plugins.filter(function (plugin) {
            let collectors = plugin.findCollectors(url);

            return collectors && collectors.length;
        }, this);
    }

    /**
     * Get by id
     *
     * @param id
     */
    get(id) {
        let found = this.plugins.find(function (item) {
            return item.id == id;
        });

        return found;
    }

    /**
     * Load plugins from local storage
     */
    load() {
        // let json = JSON.parse(localStorage.getItem('plugins'));
        let json = JSON.parse(`
        [{
            "id": "coolector",
            "name": "Coolector",
            "description": "Collect Instagram images.",
            "version": "0.1.0",
            "logo": "data:image/png;base64,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",
            "url": "http://www.coolector.net/",
            "api_url": "https://private-25f9f-coolectorset.apiary-mock.com",
            "collectors": [
                {
                    "id": "select-articles-images",
                    "type": "in_view_selector",
                    "config": {
                        "selector": "article>div img"
                    }
                },
                {
                    "id": "select-articles",
                    "type": "parents_selector",
                    "parent": "select-articles-images",
                    "config": {
                        "selector": "article"
                    }
                },
                {
                    "id": "select-link",
                    "type": "find_selector",
                    "parent": "select-articles",
                    "weight": 1,
                    "config": {
                        "selector": ">div:eq(1)>div:eq(1) a"
                    }
                }
            ]
        }]
`);
        if (Array.isArray(json)) {
            let parser = new PluginParser();
            json.forEach((item) => {
                this.addPlugin(parser.fromJSON(item));
            });
        }
    }

    /**
     * Save current loaded plugins to local storage
     */
    save() {
        localStorage.setItem('plugins', JSON.stringify(this.plugins));
    }
};
