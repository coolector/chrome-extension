'use strict';

import PluginRepository from './PluginRepository';
import CollectorExecutor from '../collectors/CollectorExecutor';

/**
 * PluginExecutor
 */
export default class PluginExecutor {

    /**
     * URL to select and execut collectors for
     *
     * @param url
     */
    constructor(url) {
        this.url = url;
        this.pluginRepository = PluginRepository.instance;
        this.plugins = this.pluginRepository.findPlugins(this.url);
        this.results = [];
    }

    /**
     * Any plugins match the URL?
     */
    hasPlugins() {
        return this.plugins.length > 0;
    }

    /**
     * Start the process
     */
    execute() {
        this.plugins.forEach((plugin) => {
            let collectors = plugin.findCollectors(this.url);
            let collectorExecutor = new CollectorExecutor(collectors);
            let results = collectorExecutor.execute(null);
            if (results.length) {
                this.results.push({
                    plugin_id: plugin.id,
                    results: results
                });
            }
        });

        return this.results;
    }
}