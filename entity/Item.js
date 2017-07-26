'use strict';

/**
 * Item
 */
export default class Item {
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

    getSerializeTags() {
        return this.tags.join(', ');
    }
};

