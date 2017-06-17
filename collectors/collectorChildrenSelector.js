'use strict';

const AbstractCollector = require('./abstractCollector').AbstractCollector;

/**
 * Select children dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
let CollectorChildrenSelector = class extends AbstractCollector {

    execute (context) {
        return $(context).children(this.collector.config.selector);
    }
};

module.exports = {
    CollectorChildrenSelector: CollectorChildrenSelector
};

