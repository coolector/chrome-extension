'use strict';

/**
 * Collector
 */
export default class Collector {

    constructor() {
        this.type = null;
        this.config = {};
        this.domain = '.*';
        this.weight = 0;
        this.id = null;
        this.parent = null;
        this.value = null;
    };
};
