'use strict';

let Collector = class {

    constructor() {
        this.type = null;
        this.config = {};
        this.domain = null;
        this.weight = 0;
        this.id = null;
        this.parent = null;
        this.value = null;
    };
};

module.exports = {
    Collector: Collector
};