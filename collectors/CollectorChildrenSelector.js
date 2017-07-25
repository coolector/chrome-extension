'use strict';

import AbstractCollector from './AbstractCollector'
/**
 * Select children dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
export default class CollectorChildrenSelector extends AbstractCollector {

    execute (context) {
        return $(context).children(this.collector.config.selector);
    }
};

