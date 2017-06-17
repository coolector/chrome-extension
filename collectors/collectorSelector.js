'use strict';

const AbstractCollector = require('./abstractCollector').AbstractCollector;

/**
 * Select dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
let CollectorSelector = class extends AbstractCollector {

    execute (context) {
        return $(this.collector.config.selector, context);
    }
};

module.exports = {
    CollectorSelector: CollectorSelector
};

