'use strict';

const Item = class {

    constructor() {
        this.id = null;
        this.url = null;
        this.title = null;
        this.tags = new Array(0);
        this.collectors = new Array(0);
        this.image = null;
        this.createdAt = null;
        this.updatedAt = null;
    }
};

module.exports = {
    Item: Item
};
