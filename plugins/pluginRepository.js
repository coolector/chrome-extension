'use strict';

const PluginParser = require('./pluginParser').PluginParser;
const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Persist and load collectors available
 *
 * @type {PluginRepository}
 */
const PluginRepository = class PluginRepository {

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
        let plugins = this.plugins.filter(function (plugin) {
            let collectors = plugin.collectors.filter(function (colector) {
                let reg = new RegExp(colector.domain, 'i');
                return url.match(reg) !== false;
            });

            return collectors && collectors.length;
        }, this);

        return plugins;
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
        let json = JSON.parse(localStorage.getItem('plugins'));
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

module.exports = {
    PluginRepository: PluginRepository
};