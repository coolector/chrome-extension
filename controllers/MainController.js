'use strict';

import PluginExecutor from '../plugins/PluginExecutor';
import MainView from '../views/MainView';
import Item from '../entity/Item';
import PluginRepository from '../plugins/PluginRepository';

/**
 * MainController
 */
export default class MainController {

    constructor () {
        this.message = null;
        this.pluginRepository = PluginRepository.instance;
        this.items = [];
        this.url = window.location.href;
    }
    /**
     * Main action dispatched
     */
    dispatch() {
        let plugins = this.pluginRepository.findActive();

        if (plugins.length) {
            // Results are populated inside the plugin
            let results = this.execute(plugins);
            plugins.forEach((plugin) => {
                let item = {
                    plugin_id: plugin.id,
                    plugin: plugin,
                    has_results: false,
                    item: null,
                    tags: ''
                };

                results.find((result) => {
                    if (result.plugin_id === plugin.id) {
                        item.has_results = true;
                    }
                });

                this.items.push(item);
            });

            if (results.length) {
                // Submit data to collectors
                this.submitResults(results);

                // Async display after communication with server
                return true;
            }
        }
        else {
            this.message = 'There are no active collectors. <br /> Please go to <a href="#">settings</a> and activate one or more collectors.';
        }

        this.display();
    }

    /**
     * Run collector on current URL
     *
     * @returns {*}
     */
    execute() {
        let pluginExecutor = new PluginExecutor(this.url);
        let results = pluginExecutor.execute();

        if (!results.length) {
            this.message = "Coolector was unable to collect anything on this page. Make sure your active collectors support this website.";
            return [];
        }

        return results;
    }

    /**
     * Submit results to collectors
     * @param results
     */
    submitResults(results) {
        results.forEach((result) => {
            let plugin = this.pluginRepository.get(result.plugin_id);
            if (!plugin) {
                this.message = `Could not find plugin ${result.plugin_id}`;
                this.display();
                throw this.message;
            }

            let item = new Item();
            item.url = this.url;
            item.collectors = result.results;
            let repo = plugin.getItemRepository();
            repo.save(item, (item) => {
                let itm = this.items.find((itm) => {
                    return plugin.id === itm.plugin_id;
                });
                itm.item = item;
                itm.tags = item.getSerializeTags();

                this.display();
            });
        });
    }

    /**
     * Display the popup
     */
    display() {
        // Initialize view and display box
        let mainView = new MainView({
            message: this.message,
            items: this.items
        });
        mainView.display();
    }
}