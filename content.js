'use strict';

require('./css/bootstrap.css');
require('./css/content.css');
const PluginRepository = require('./plugins/pluginRepository').PluginRepository;

let pluginRepository = PluginRepository.instance;
let plugins = pluginRepository.findPlugins(window.location.href);

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
