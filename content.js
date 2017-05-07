'use strict';

const Bloodhound = require('typeahead.js');
require('./css/bootstrap.css');
require('./css/content.css');
require('./js/bootstrap-tokenfield.js');
require('./css/bootstrap-tokenfield.css');
require('./css/tokenfield-typeahead.css');
const PluginRepository = require('./plugins/pluginRepository').PluginRepository;

let pluginRepository = PluginRepository.instance;
let plugins = pluginRepository.findPlugins(window.location.href);

plugins.forEach(function (plugin) {
    plugin.
});

/**
 * Display popup
 */
function showPopup() {
    let htmlPopup = require('./handlebars/popup.handlebars');
    let popup = $('#coolector-box');
    if (popup.eq(0).length) {
        popup.html();
    }
    else {
        $('body').append(htmlPopup());
    }
}

showPopup();

setTimeout(function () {
    let engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: 'https://private-25f9f-coolectorset.apiary-mock.com/tags?q=%QUERY%20text&limit=10&offset=0&sort=-tag%2Ccreated_at',
            wildcard: '%QUERY',
            transform: function(response) {
                return response.map(function(item) {
                    return item.tag;
                });
            }
        }

    });

    engine.initialize();

    $('#coolector-tags').tokenfield({
        typeahead: [null, { source: engine.ttAdapter() }]
    }).on('tokenfield:createdtoken', function (e) {
        console.log(e.attrs.value);
    }).on('tokenfield:removedtoken', function (e) {
        alert('Token removed! Token value was: ' + e.attrs.value)
    }).on('tokenfield:editedtoken', function (e) {
        console.log("Edited" + e.attrs.value);
    });
}, 200);


// var $ = require('jquery');

// console.log($);

// function getAttributes ( node ) {
//     var i,
//         attributeNodes = node.attributes,
//         length = attributeNodes.length,
//         attrs = {};

//     for ( i = 0; i < length; i++ ) attrs[attributeNodes[i].name] = attributeNodes[i].value;
//     return attrs;
// }


// var items = $('article>div img:in-viewport');
// items.each(function () {
//   var fracts = $(this).fracs();
//   console.log(getAttributes(this));
//   console.log(fracts.visible);
// });

// console.log(.fracs());
