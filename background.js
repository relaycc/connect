// Update extension icon to be colored on Twitter, grey otherwise
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
		setIcon(tab.url);

    if (tab.url.includes('twitter.com')) {
      chrome.scripting.insertCSS({ target: { tabId: tab.id },  files: ["main.css"]});
      chrome.scripting.executeScript({target: {tabId: tab.id}, files: ["content-script.js"]}, function() {
        chrome.tabs.sendMessage( tab.id, {
          message: 'update-url',
          url: tab.url
        })
      });
    }
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	setIcon(tab.url);

  // Notify content-script that url has updated
  if (tab.url.includes('twitter.com')) {
    chrome.scripting.insertCSS({ target: { tabId: tab.id },  files: ["main.css"]});
    chrome.scripting.executeScript({target: {tabId: tab.id}, files: ["content-script.js"]}, function() {
      chrome.tabs.sendMessage( tabId, {
        message: 'update-url',
        url: changeInfo.url
      })
    });
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
	chrome.action.setIcon({path: {'38': 'greyTag.png'}});
});

function setIcon(url) {
	if (url.includes('twitter.com')) {
		chrome.action.setIcon({path: {'38': 'tag.png'}});
	} else {
    chrome.action.setIcon({path: {'38': 'greyTag.png'}});
  }
};
