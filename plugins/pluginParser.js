'use strict';

const Plugin = require('./plugin').Plugin;
const Collector = require('../collectors/collector').Collector;
const $ = require('jquery');
/**
 * Parse new plugin manifest and create new plugin object
 *
 * @type {PluginParser}
 */
const PluginParser = class {

    fromJSON(json) {
        let plugin = new Plugin();
        plugin.id = json.id;
        plugin.name = json.name;
        plugin.version = json.version;
        plugin.description = json.description;
        plugin.logo = json.logo;
        plugin.url = json.url;
        plugin.api_url = json.api_url;
        plugin.enable = (json.enable) ? true : false;

        if (Array.isArray(json.collectors)) {
            json.collectors.forEach((collectorJson) => {
                let collector = new Collector();
                collector.id = collectorJson.id;
                collector.type = collectorJson.type;
                collector.parent = collectorJson.parent;
                collector.config = collectorJson.config;
                collector.weight = collectorJson.weight;
                plugin.collectors.push(collector);
            });
        }

        return plugin;
    }

    toJSON(plugin) {

    }
};

module.exports = {
    PluginParser: PluginParser
};