/**
 * @param  {String}
 * @return {[type]}
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: 'build/content.js'});
  chrome.tabs.insertCSS(tab.id, {file: 'build/content.css'});
});
