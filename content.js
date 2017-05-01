'use strict';

let ItemRepository = require('./entity/itemRepository').ItemRepository;

let itemRepo = new ItemRepository();
let item = itemRepo.load(1);

console.log(item);

// var $ = require('jquery');

// console.log($);

// function getAttributes ( node ) {
//     var i,
//         attributeNodes = node.attributes,
//         length = attributeNodes.length,
//         attrs = {};

//     for ( i = 0; i < length; i++ ) attrs[attributeNodes[i].name] = attributeNodes[i].value;
//     return attrs;
// }


// var items = $('article>div img:in-viewport');
// items.each(function () {
//   var fracts = $(this).fracs();
//   console.log(getAttributes(this));
//   console.log(fracts.visible);
// });

// console.log(.fracs());
