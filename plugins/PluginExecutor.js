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
     * Start the process
     */
    execute() {
        this.plugins.forEach((plugin) => {
            let collectors = plugin.findCollectors(this.url);
            let collectorExecutor = new CollectorExecutor(collectors);
            this.results.push({
                plugin_id: plugin.id,
                results: collectorExecutor.execute(null)
            });
        });

        return this.results;
    }
}