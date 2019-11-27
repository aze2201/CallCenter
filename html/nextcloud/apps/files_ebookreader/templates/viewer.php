<?php
  /** @var array $_ */
  /** @var OCP\IURLGenerator $urlGenerator */
  $urlGenerator = $_['urlGenerator'];
  $version = \OC::$server->getAppManager()->getAppVersion('files_ebookreader');
  $file = $_GET['file'];
?>
<!DOCTYPE html>
<!--
Copyright 2012 Mozilla Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Adobe CMap resources are covered by their own copyright but the same license:

    Copyright 1990-2015 Adobe Systems Incorporated.

See https://github.com/adobe-type-tools/cmap-resources
-->
<html dir="ltr" mozdisallowselectionprint moznomarginboxes>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="google" content="notranslate">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Ebook reader</title>
    <!-- This snippet is used in production (included from viewer.html) -->

    <link rel="stylesheet" href="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/normalize.css')) ?>">
    <link rel="stylesheet" href="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/main.css')) ?>">
    <link rel="stylesheet" href="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/popup.css')) ?>">

    <script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>" src="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/jquery.min.js')) ?>"></script>
    <script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>" src="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/zip.min.js')) ?>"></script>
    <script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>">
        "use strict";

        document.onreadystatechange = function () {
          if (document.readyState == "complete") {
            window.reader = ePubReader("<?php p($file) ?>", {
               restore: true
             });
          }
        };

    </script>

    <!-- File Storage -->
    <!-- <script src="js/libs/localforage.min.js"></script> -->

    <!-- Full Screen -->
    <script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>" src="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/screenfull.min.js')) ?>"></script>

    <!-- Render -->
    <script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>" src="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/epub.js')) ?>"></script>

    <!-- Reader -->
    <script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>" src="<?php p($urlGenerator->linkTo('files_ebookreader', 'vendor/epubjs/reader.js')) ?>"></script>

  </head>

  <body tabindex="1" class="loadingInProgress">
    <div id="sidebar">
      <div id="panels">
        <!-- <input id="searchBox" placeholder="search" type="search"> -->

        <!-- <a id="show-Search" class="show_view icon-search" data-view="Search">Search</a> -->
        <a id="show-Toc" class="show_view icon-list-1 active" data-view="Toc">TOC</a>
        <a id="show-Bookmarks" class="show_view icon-bookmark" data-view="Bookmarks">Bookmarks</a>
        <!-- <a id="show-Notes" class="show_view icon-edit" data-view="Notes">Notes</a> -->

      </div>
      <div id="tocView" class="view">
      </div>
      <div id="searchView" class="view">
        <ul id="searchResults"></ul>
      </div>
      <div id="bookmarksView" class="view">
        <ul id="bookmarks"></ul>
      </div>
      <div id="notesView" class="view">
        <div id="new-note">
          <textarea id="note-text"></textarea>
          <button id="note-anchor">Anchor</button>
        </div>
        <ol id="notes"></ol>
      </div>
    </div>
    <div id="main">

      <div id="titlebar">
        <div id="opener">
          <a id="slider" class="icon-menu">Menu</a>
        </div>
        <div id="metainfo">
          <span id="book-title"></span>
          <span id="title-seperator">&nbsp;&nbsp;–&nbsp;&nbsp;</span>
          <span id="chapter-title"></span>
        </div>
        <div id="title-controls">
          <a id="bookmark" class="icon-bookmark-empty">Bookmark</a>
          <a id="setting" class="icon-cog">Settings</a>
          <a id="fullscreen" class="icon-resize-full">Fullscreen</a>
        </div>
      </div>

      <div id="divider"></div>
      <div id="prev" class="arrow">‹</div>
      <div id="viewer"></div>
      <div id="next" class="arrow">›</div>

      <div id="loader"><img src="img/loader.gif"></div>
    </div>
    <div class="modal md-effect-1" id="settings-modal">
        <div class="md-content">
            <h3>Settings</h3>
            <div>
                <p>
                  <input type="checkbox" id="sidebarReflow" name="sidebarReflow">Reflow text when sidebars are open.
                </p>
            </div>
            <div class="closer icon-cancel-circled"></div>
        </div>
    </div>
    <div class="overlay"></div>
  </body>
</html>
