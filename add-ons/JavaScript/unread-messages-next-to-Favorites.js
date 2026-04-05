// ==UserScript==
// @name         AO3: Unread Messages next to Favorites
// @version      1.0
// @description  Moves the Unread Messages section next to the Favorites list on the AO3 home page.
// @author       ravenothere
// @license      MIT
// @match        *://archiveofourown.org/*
// @grant        none
// @namespace    https://greasyfork.org/users/1565271-ravenothere
// ==/UserScript==

(function() {
    'use strict';

const favorites = document.querySelector('.favorite');
const messages = document.querySelector('.latest.messages');

if (favorites && messages) {
  favorites.after(messages);
}
})();