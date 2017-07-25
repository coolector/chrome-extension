'use strict';

import AbstractCollector from './AbstractCollector'

require('jquery-fracs');
/**
 * Select dom elements using a jquery selector
 *
 * @type {CollectorInViewSelector}
 */
export default class CollectorInViewSelector extends AbstractCollector {

    execute (context) {
        return $(this.collector.config.selector, context).isInViewport({ tolerance: 0 }).map(function (index) {
           let specs = $(this).fracs();
           $(this).data('visible', specs.visible);

           return this;
        });
    }
};

