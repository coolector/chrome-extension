'use strict';

import '../css/main.css';
import '../js/bootstrap-tokenfield.js';

/**
 * MainView
 */
export default class MainView {

    constructor() {
        this.element = null;
        this.timeout = null;
    }

    display() {
        let htmlPopup = require('../handlebars/popup.handlebars');
        this.element = $('#coolector-box');
        if (!this.element.eq(0).length) {
            $('body').append(htmlPopup());
            this.element = $('#coolector-box');

            this.initTypeahead();
        }

        let menu = $('#coolector-menu', this.element);

        $('#coolector-menu-toggler', this.element).click((event) => {
            menu.slideToggle('fast');

            event.stopPropagation();
        });

        /**
         * Make popup visible
         */
        setTimeout(() => {
            this.element.removeClass('coolector-hidden');
        }, 200);

        this.initTimeout();
        this.element.mouseleave(() => {
            this.initTimeout();
        });

        this.element.mouseenter(() => {
            // Stop hiding the popup
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        });

        this.element.click(() => {
            menu.slideUp();
        });
    }

    initTimeout() {
        if (this.timeout) return;
        // Hide popup
        this.timeout = setTimeout(() => {
            this.element.addClass('coolector-hidden');
        }, 3000);
    }

    initTypeahead() {
        const Bloodhound = require('typeahead.js');

        let engine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: 'https://private-25f9f-coolectorset.apiary-mock.com/tags?q=%QUERY%20text&limit=10&offset=0&sort=-tag%2Ccreated_at',
                wildcard: '%QUERY',
                transform: function(response) {
                    return response.map(function(item) {
                        return item.tag;
                    });
                }
            }

        });

        engine.initialize();

        $('#coolector-tags', this.element).tokenfield({
            typeahead: [null, { source: engine.ttAdapter() }]
        }).on('tokenfield:createdtoken', function (e) {
            console.log(e.attrs.value);
        }).on('tokenfield:removedtoken', function (e) {
            alert('Token removed! Token value was: ' + e.attrs.value)
        }).on('tokenfield:editedtoken', function (e) {
            console.log("Edited" + e.attrs.value);
        });
    }

    /**
     * Housekeeping removing or hiding the element
     */
    destroy() {

    }
}
