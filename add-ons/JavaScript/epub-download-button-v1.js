// ==UserScript==
// @name         AO3: EPUB Download Button V1
// @version      1.0
// @description  Adds a customizable EPUB download button at the bottom-left of work blurbs on AO3
// @author       Merna
// @license      MIT
// @match        *://archiveofourown.org/*
// @grant        none
// @namespace    https://greasyfork.org/en/users/1565271-merna
// ==/UserScript==

(function() {
  'use strict';

  // ============================================================================
  // CUSTOMIZATION: Change the button symbol/text here
  // ============================================================================
  const BUTTON_TEXT = '🡓';  // You can change this to any symbol or text!
  // Examples: '⬇', '📖', '💾', 'EPUB', '⇩', '⤓', '⭳', '↓'
  // ============================================================================

  console.log('[AO3: EPUB Download Button V1] Loaded');

  // Find all work blurbs
  const blurbs = document.querySelectorAll('li.blurb');
  if (!blurbs.length) return;

  // Add CSS to position the button at bottom-left
  const style = document.createElement('style');
  style.textContent = `
    /* Make blurb a positioning context */
    .blurb {
      position: relative;
    }

    /* Position download button at bottom-left */
    .blurb .download.actions {
      position: absolute;
      left: 0.735em;
      bottom: 0.7em;
      white-space: nowrap;
      z-index: 3;
    }
  `;
  document.head.appendChild(style);

  // Add download button to each blurb
  blurbs.forEach(blurb => {
    // Find the work link
    const titleLink = blurb.querySelector('.header.module .heading a[href*="/works/"]');
    if (!titleLink) return;

    // Extract work ID
    const workId = titleLink.href.match(/\/works\/(\d+)/)?.[1];
    if (!workId) return;

    // Create download button container
    const container = document.createElement('div');
    container.className = 'download actions';

    // Create download link
    const link = document.createElement('a');
    link.href = `/downloads/${workId}/work.epub`;
    link.title = 'Download EPUB';
    link.textContent = BUTTON_TEXT;

    container.appendChild(link);
    blurb.appendChild(container);
  });

})();