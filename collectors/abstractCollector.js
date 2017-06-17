'use strict';

const AbstractCollector = class {

    /**
     * Wrapper for a general types collector
     * @param collector
     */
    constructor (collector) {
        this.collector = collector;
    }
    /**
     * Execute collector on a context
     */
    execute(context) {

    }

};

module.exports = {
    AbstractCollector: AbstractCollector
};
