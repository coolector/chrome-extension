'use strict';

const AbstractCollector = require('./abstractCollector').AbstractCollector;

/**
 * Select parents dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
let CollectorParentsSelector = class extends AbstractCollector {

    execute (context) {
        return $(context).parents(this.collector.config.selector);
    }
};

module.exports = {
    CollectorParentsSelector: CollectorParentsSelector
};

