'use strict';

import AbstractCollector from './AbstractCollector'

/**
 * Select parents dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
export default class CollectorParentsSelector extends AbstractCollector {

    execute (context) {
        return $(context).parents(this.collector.config.selector);
    }
};

