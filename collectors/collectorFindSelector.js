'use strict';

const AbstractCollector = require('./abstractCollector').AbstractCollector;

/**
 * Find dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
let CollectorFindSelector = class extends AbstractCollector {

    execute (context) {
        return $(context).find(this.collector.config.selector);
    }
};

module.exports = {
    CollectorFindSelector: CollectorFindSelector
};

