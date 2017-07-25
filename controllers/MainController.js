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
        this.results = [];
    }
    /**
     * Main action dispatched
     */
    dispatch() {

        let plugins = PluginRepository.instance.findActive();

        if (plugins.length) {
            this.results = this.execute(plugins);
            plugins.forEach((plugin) => {
                this.results.find((item) => {
                    if (item.plugin_id === plugin.id) {
                        plugin.results = item.results;
                    }
                })
            })
        }
        else {
            this.message = 'There are no active collectors. <br /> Please go to <a href="#">settings</a> and activate one or more collectors.';
        }

            // let item = new Item();
            // item.url = url;
            // item.collectors = results;
            // let repo = plugin.getItemRepository();
            // repo.save(item);

        // Initialize view and display box
        let mainView = new MainView({
            message: this.message,
            results: this.results,
            plugins: plugins
        });
        mainView.display();
    }

    /**
     * Run collector on current URL
     *
     * @returns {*}
     */
    execute() {
        let url = window.location.href;

        let pluginExecutor = new PluginExecutor(url);
        let results = pluginExecutor.execute();

        if (!results.length) {
            this.message = "Coolector was unable to collect anything on this page. Make sure your active collectors support this website.";
            return [];
        }

        return results;
    }
}