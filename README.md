# chrome-localStorage-shim
chrome-localStorage-shim provides a thin emulation layer to chrome.storage.local to implement window.localStorage in a packaged chrome app environment.

In a packaged app environment, many things are limited due to the design.

But many libraries and frameworks depend on basic HTML5 features such as localStorage, and it being unavailable on the packaged app environment makes things so much harder. You would encounter the following error.

> window.localStorage is not available in packaged apps. Use chrome.storage.local instead.

Just adding the `<script src="chrome_localStorage.js"></script>` line in the `<head>` tag solves everything.
