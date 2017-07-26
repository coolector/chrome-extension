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
        return this.findActive().filter(function (plugin) {
            let collectors = plugin.findCollectors(url);

            return collectors && collectors.length;
        }, this);
    }

    /**
     * Find plugins that are enabled
     */
    findActive() {
        return this.plugins.filter(function (plugin) {
            return plugin.isEnabled();
        })
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
            "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYoAAAGKCAYAAAASfgYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABvNJREFUeNrs3DFu4zAURVErEOAdsPT2vCZvzyV34EqpAgRBAEu2KP9PnlMHU2iSuXmkPNOyLKc1aq0nONDiEWxXSpla/LmP28XfR0fO1/um75PZI0MYAKFAHAChQBwAoUAYAKFAHAChQBgAoUAcAKFAGAChAHEAhAKBAIQCcQCEAnEAhAKBAIQCgQCEAnEAhAKBAIQCgQCEAoEAEApxABAKgQAQCoEAaOnLIxAJAItCIACEQiAAhEIgAIRCIACicZktEgAWhUAACIVAADTi6EkkACwKgQCwKEQCwKIQCACLQiQALAqBALAoRAJAKBAJYBSOngQCwKIQCQChEAmARhw9CQSARSESAEIhEgBCIRIAQiESAOG4zBYIAItCJACEQiQAhEIkAIRCJACEQiQAhEIkAIRCJACEQiQAGDgUIgEgFCIBIBQiASAUIgEgFCIBIBQiASAUIgEgFAAIhTUBwBChEAkAoRAJAKEQCQChEAkAoQBAKKwJAKEQCQChEAkAegqFSAAIBQBCYU0ACIVIAAgFAEJhTQAIhUgAkHxRACAU1gSAUIgEgFAAIBTWBIBQiASAUABAwlBYEwBCAYBQWBMAQiESAEIBgFBYEwBYFAAkDoU1ASAUAAiFNQEgFAAIhTUBgEUBQPxQWBMAQgGAUFgTAEIBgFBYEwBYFADED4U1ASAUAAgFAELRgGMnAKEAQCisCQChAAChACBMKBw7AQgFAEJhTQAIBQAIBQBhQuHYCUAoABAKAISiAcdOAJ2YlmXdv+m1VqGAD/yMbvniUoonxu5mjwDyhAB6CYU1AaKAUADCgFAA4gANQuHYCXEAoQDEAaEABAKEAgQCjg6F+wkEAoQCBAKEAgQC+MX/HgsiAYcsCvcTCARYFCASIBQgEoBQgEjA0aFwP4FIgFCASIBQgEgAQoFIAEeHwv0EIgFCASIBQgEiAQgFAEIB1gSECoWLbEQChAIAoQBrAhAKRAIQCgCEAqwJyBMKbzwBCAVYE4BQACAUAAgFI3PsBEIBQLZQeOMJawKEAgCEAgChoGOOnUAoABAKAIQCGnDsBEIBQNZQ+AwFgFAAgFCQl/sJEAoAhAIAoQBAKAAQCgCEAvLwxhMIBQCZQ+FT2QBCAQBCAYBQACAUAAgFAEIBa/kMBQgFAEIBgFAAIBQACAUACAUAQgGAUAAgFAAIBQBCAYBQACAUAAgFAAgFAEIBgFAAIBQACAUAQgGAUAAgFAAIBQAIBQBCAYBQACAUAAgFAEIBgFAAIBQACAUACAUAQkGPFo8AhAIAoQBAKAAQCvgQ9xQgFAAIBQBCAQ05fgKhACBrKCaPC6sChAIAhAKrAhAKAIQCrAoQCgCEAqwKEAoAhAKsChAKEAsQihV8OhtAKMCqAIQCsQCEArEAhAIAoQCrAoQCxAI6C4VXZBELEAoQC0AoEAtAKEAsQChALEAoQCwgXyi8+YRYgFDAELEQDBAKsC5AKEAsQChALCBfKFxo02ssBAMsCrAuQCjAugChAMEAoQDBgOShcKHNqMGAYcweAbwdC78wYVEAT6NhZSAUgGAgFK8yu+H/YIgGXXBHAe2j4ZcqhALYHA3hQCgAawOh+PubkfNY2G9thArI43bx892R8/W+6fvKooCcATlFDgt98XosAEIBQIxQmLwAQgGAUABAw1A4fgIQCgCEAgAahsLxE4BQACAUANAwFI6fAIQCAKGwKgCEwiMAQCgACBsKx08AQgGAUAAgFA05fgIQCgCEwqoAEAoA+GQorAoAoQBAKKwKAKEAAKEAIGwoHD8BCAUAQmFVAAgFAHwyFFYFgFCIBYBQACAUVgWAUABA6FBYFQBCAYBQWBUAQgGAUFgVAIReFGIBIBQACIVVASAUYgEgFAAIRWhWBYBQiAWAUAAgFFYFgFCIBYBQiAUAuUMBgFBYFQBCIRYAQiEWAEIBgFBYFQBCkZ9YAAiFWAAIhVgACIVYAAiFWAAIBQBCYVUAMMCiEAsAoRALAKEQCwChEAsAoRALAKEQCwChEAsAoRALAIRCLACEQiwAhGLPWAgGgFBYFwBCIRYAQiEWAEIhFgBCkSYWggEIhUdgXQAIhVgACIVYAAhFlFgIBiAUWBcAQmFdAAiFdQEgFNYFgFBYFwBCYV0ACIV1ASAUWBeAUCAYgFDQOhgAqcxrv7CU4mntGIta6+JRABYFz4JhYQBCgWAAQoFgAELBwcEAEAqsCyCH2SNIsy68JQVYFFgZgFAgGIBQIBiAUCAYwDBcZvcVjB8uvgGLAisDsCiwMgCLAisDsCiwMgChQDQAoUA0AKEA0QCEAtEAhALRAIQC0QCEgrTREA4QChAOEAoQDkAoCBQO8QChgJfiISIgFPB2RAQFGvsWYABBC8mKU4cjHwAAAABJRU5ErkJggg==",
            "url": "http://www.coolector.net/",
            "api_url": "https://private-25f9f-coolectorset.apiary-mock.com",
            "enable": true,
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
