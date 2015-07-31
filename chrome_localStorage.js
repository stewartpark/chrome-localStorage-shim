+function() {

  if(!chrome.storage) {
    console.error('Add the `storage` permission in your manifest.json!');
    return;
  }

  var __localStorage = {};

  chrome.storage.local.get('localStorage_data', function(data) {
    try {
      __localStorage = data.localStorage_data || {};
    } catch(e) {
      console.warn('Failed to load the previous data. Perhaps the first run?');
    }
  });

  var timeout;
  window.__defineGetter__('localStorage', function(){
    return {
        'getItem': function(k) {
          try {
            return __localStorage[k];
          } catch(e) {
            return undefined;
          }
        },
        'setItem': function(k, v) {
          __localStorage[k] = ''+v;
          clearTimeout(timeout);
          timeout = setTimeout(function(){
            try {
              chrome.storage.local.set({
                'localStorage_data': __localStorage
              });
            } catch(e) {
              console.error(e);
            }
          }, 1000);
        }
    }
  });
}();
