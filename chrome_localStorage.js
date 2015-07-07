+function() {

  if(!chrome.storage) {
    console.error('Add the `storage` permission in your manifest.json!');
    return;
  }

  var __localStorage = {};

  chrome.storage.local.get('localStorage_data', function(data) {
    try {
      __localStorage = JSON.parse(data.localStorage_data);
    } catch(e) {
      console.warn('Failed to load the previous data. Perhaps the first run?');
    }
  });

  window.__defineGetter__('localStorage', function(){
    return {
        'getItem': function(k) {
          return __localStorage[k];
        },
        'setItem': function(k, v) {
          __localStorage[k] = ''+v;
          try {
            chrome.storage.local.set({
              'localStorage_data': JSON.stringify(__localStorage)
            });
          } catch(e) {
            console.error(e);
          }
        }
    }
  });
}();
