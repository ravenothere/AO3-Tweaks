// ==UserScript==
// @name         AO3: Unread Messages next to Favorites
// @version      1.2
// @description  Moves the Unread Messages section next to the Favorites list on the AO3 home page.
// @author       ravenothere
// @license      MIT
// @match        *://archiveofourown.org/*
// @grant        none
// @namespace    https://greasyfork.org/users/1565271
// ==/UserScript==

(function() {
    'use strict';

const favorites = document.querySelector('.favorite');
const messages = document.querySelector('.latest.messages');
const news = document.querySelector('.latest.news');
const markedForLater = document.querySelector('.random.readings.module');

if (favorites && messages) {
  favorites.after(messages);
}

if (news && markedForLater) {
  news.before(markedForLater);
}
})();