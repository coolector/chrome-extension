'use strict';

import AbstractCollector from './AbstractCollector'

/**
 * Select dom elements using a jquery selector
 *
 * @type {CollectorSelector}
 */
export default class CollectorSelector extends AbstractCollector {

    execute (context) {
        return $(this.collector.config.selector, context);
    }
};

