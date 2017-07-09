'use strict';

import '../css/main.css';

/**
 * MainView
 */
export default class MainView {

    constructor() {

    }

    display() {
        let htmlPopup = require('../handlebars/popup.handlebars');
        let popup = $('#coolector-box');
        if (!popup.eq(0).length) {
            $('body').append(htmlPopup());
            popup = $('#coolector-box');
        }

        setTimeout(function () {
            popup.removeClass('coolector-hidden');
        }, 200);

        setTimeout(function () {
            popup.addClass('coolector-hidden');
        }, 3000)
    }

    /**
     * Housekeeping removing or hiding the element
     */
    destroy() {

    }
}
