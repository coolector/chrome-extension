'use strict';

import Item from './Item';

export default class ItemParser {

    fromJSON(json) {
        let item = new Item();

        item.id = json.id;
        item.url = json.url;
        item.title = json.title;
        item.image = json.image;
        if (Array.isArray(json.tags)) {
            item.tags = [];
            json.tags.forEach((tag) => {
                item.tags.push(tag);
            });
        }
        item.createdAt = new Date(json.created_at);
        item.updatedAt = new Date(json.updated_at);

        return item;
    }

    toJSON(item) {

    }
}