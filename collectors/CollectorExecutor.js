'use strict';

require('isInViewport');

const CollectorSelector = require('./collectorSelector').CollectorSelector;
const CollectorParentsSelector = require('./collectorParentsSelector').CollectorParentsSelector;
const CollectorChildrenSelector = require('./collectorChildrenSelector').CollectorChildrenSelector;
const CollectorFindSelector = require('./collectorFindSelector').CollectorFindSelector;
const CollectorInViewSelector = require('./collectorInViewSelector').CollectorInViewSelector;

/**
 * Execute a set of collectors on a piece of context
 *
 * @type {CollectorExecutor}
 */
export default class {

    /**
     * Collectors executor receives a collectors array of Collector object
     *
     * @param collectors
     */
    constructor(collectors) {
        this.collectors = collectors;
        this.results = {};
    };

    /**
     * Apply collectors
     */
    execute(context) {
        this.collectors.forEach((collector) => {
            let selector = null;
            if (collector.parent && this.results[collector.parent]) {
                context = this.results[collector.parent];
            }
            switch (collector.type) {
                case 'selector':
                        selector = new CollectorSelector(collector);
                        this.results[collector.id] = selector.execute(context);
                    break;
                case 'parents_selector':
                        selector = new CollectorParentsSelector(collector);
                        this.results[collector.id] = selector.execute(context);
                    break;
                case 'children_selector':
                        selector = new CollectorChildrenSelector(collector);
                        this.results[collector.id] = selector.execute(context);
                    break;
                case 'find_selector':
                        selector = new CollectorFindSelector(collector);
                        this.results[collector.id] = selector.execute(context);
                    break;
                case 'in_view_selector':
                        selector = new CollectorInViewSelector(collector);
                        this.results[collector.id] = selector.execute(context);
                    break;
                default:
                    throw 'Could not find a collector of type of ' + collector.type;
            }
        });

        return this.resultsToJSON();
    };

    resultsToJSON() {
        let output = [];
        this.collectors.forEach((collector) => {
            if (this.results[collector.id]) {
                let values = [];
                this.results[collector.id].each(function () {
                    let element = $(this).prop("tagName").toLowerCase();
                    let attributes = {};
                    $(this).each(function() {
                        $.each(this.attributes, function() {
                            if(this.specified) {
                                attributes[this.name] = this.value;
                            }
                        });
                    });

                    values.push({
                        'element': element,
                        'attributes': attributes,
                        'data': $(this).data(),
                        'content': $(this).clone()
                            .children()
                            .remove()
                            .end()
                            .text()
                    });
                });
                output.push({
                    'id': collector.id,
                    'value': values
                });
            }
        });

        return output;
    };
};
