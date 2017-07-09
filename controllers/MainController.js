'use strict';

import PluginExecutor from '../plugins/PluginExecutor';
import MainView from '../views/MainView';
import Item from '../entity/Item';

/**
 * MainController
 */
export default class MainController {

    /**
     * Main action dispatched
     */
    dispatch() {
        let url = window.location.href;

        let pluginExecutor = new PluginExecutor(url);
        let results = pluginExecutor.execute();


        // let item = new Item();
        // item.url = url;
        // item.collectors = results;
        // let repo = plugin.getItemRepository();
        // repo.save(item);

        // Initialize view and display box
        let mainView = new MainView();
        mainView.display();
    }
}