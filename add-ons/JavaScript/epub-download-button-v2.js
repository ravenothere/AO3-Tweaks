// ==UserScript==
// @name         AO3: EPUB Download Button V2
// @version      2.0
// @description  Adds a customizable EPUB download button next to work titles on AO3 blurbs (pairs perfectly with Chapter Shortcuts)
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
  const BUTTON_TEXT = '✦';  // You can change this to any symbol or text!
  // Examples: '⬇', '📖', '💾', 'EPUB', '⇩', '⤓', '⭳', '↓'
  // ============================================================================

  console.log('[AO3: EPUB Download Button V2] Loaded');

  /**
   * Adds EPUB download buttons to work titles on the page
   */
  function addEpubButtons() {
    // Find all work title headings
    const headings = document.querySelectorAll('.header h4.heading');

    headings.forEach(heading => {
      // Skip if button already exists
      if (heading.querySelector('.ao3-epub-download-btn')) {
        return;
      }

      // Find the work link
      const workLink = heading.querySelector('a[href*="/works/"]');
      if (!workLink) return;

      // Extract work ID from the link
      const workId = workLink.href.match(/\/works\/(\d+)/)?.[1];
      if (!workId) return;

      // Create the download button
      const button = document.createElement('a');
      button.className = 'ao3-epub-download-btn';
      button.href = `/downloads/${workId}/work.epub`;
      button.title = 'Download EPUB';
      button.textContent = `${BUTTON_TEXT}`;

      // Add the button to the end of the heading (after any other buttons)
      heading.appendChild(button);
    });
  }

  /**
   * Removes existing buttons so they can be re-added in the correct position
   */
  function repositionButtons() {
    const existingButtons = document.querySelectorAll('.ao3-epub-download-btn');
    existingButtons.forEach(btn => btn.remove());
    addEpubButtons();
  }

  // Initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addEpubButtons();
      // Wait for other scripts to load, then reposition
      setTimeout(repositionButtons, 150);
    });
  } else {
    addEpubButtons();
    setTimeout(repositionButtons, 150);
  }

  // Watch for dynamically loaded content
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;

        // Check if work blurbs or other script buttons were added
        if (node.matches?.('.blurb, .ao3-last-chapter-link') ||
            node.querySelector?.('.header h4.heading, .ao3-last-chapter-link')) {
          repositionButtons();
          return;
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();