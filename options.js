'use strict';

require('bootstrap.css');
require('./css/options.css');
const PluginParser = require('./plugins/pluginParser').PluginParser;
const PluginRepository = require('./plugins/pluginRepository').PluginRepository;

const $ = require('jquery');

let htmlCollector = require('./handlebars/collector-options.handlebars');

let pluginRepository = PluginRepository.instance;
let plugins = pluginRepository.findPlugins();

function updateUI() {
    plugins.forEach(function (plugin) {
        let repo = plugin.getUserRepository();
        let username = null;
        repo.getUser(function (user) {
            username = 'none';
            if (user) {
                username = user.email;
            }

            $('#collectors').html(htmlCollector({
                id: plugin.id,
                name: plugin.name,
                version: plugin.version,
                description: plugin.description,
                user: username,
                url: plugin.url,
                enable: plugin.enable
            }));

            $('.checkbox_enabled').on('change', (data) => {
                let input = $(data.currentTarget);
                let plugin = pluginRepository.get(input.attr('data-plugin'));
                if (plugin) {
                    plugin.enable = input.prop('checked');
                    pluginRepository.save();
                }
                else {
                    alert('Could not find plugin.');
                }
            });
        });
    });
}
updateUI();

$('#collectors-add').on('submit', function (event) {
    event.preventDefault();
    let url = $('#collectors-add-url', event.currentTarget).val();
    if (url) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: (data) => {
                let pluginParser = new PluginParser();
                let plugin = pluginParser.fromJSON(data);
                if (plugin) {
                    pluginRepository.addPlugin(plugin);
                    pluginRepository.save();

                    updateUI();
                }
                else {
                    alert('Could not add new plugin. Please verify that the URL is correct.');
                }
            } ,
            error: (data) => {
                alert('Error: ' + $(data.responseText).text());
            }
        });
    }
    else {
        alert('Provider URL cannot be empty. Please specify a valid URL to load a new collector from.');
    }
});

