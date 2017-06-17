'use strict';

const AbstractCollector = require('./abstractCollector').AbstractCollector;

require('jquery-fracs');
/**
 * Select dom elements using a jquery selector
 *
 * @type {CollectorInViewSelector}
 */
let CollectorInViewSelector = class extends AbstractCollector {

    execute (context) {
        return $(this.collector.config.selector, context).isInViewport({ tolerance: 0 }).map(function (index) {
           let specs = $(this).fracs();
           $(this).data('visible', specs.visible);

           return this;
        });
    }
};

module.exports = {
    CollectorInViewSelector: CollectorInViewSelector
};

