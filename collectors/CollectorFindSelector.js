'use strict';

import AbstractCollector from './AbstractCollector'

/**
 * Find dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
export default class CollectorFindSelector extends AbstractCollector {

    execute (context) {
        return $(context).find(this.collector.config.selector);
    }
};

