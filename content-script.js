chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for message sent from background.js
    if (request.message === 'update-url') {
      insertDaoPanel();
    }
		sendResponse('success');
	}
);

function insertDaoPanel() {
	removeDaoLinks();
	appendDaoLinkToHeader()
}

// Remove all links appended by us
function removeDaoLinks() {
	document.querySelectorAll('.daopanel-link').forEach(function(a){
		a.remove()
	})
}

// For now, find just the header username and append the link there.
function appendDaoLinkToHeader() {
	// This data attr can change so may not be the best way to find the header element.
	var header = document.querySelector('[data-testid="UserName"]');
	
	if (header) {
		var headerSpan = document.evaluate('descendant::text()[contains(., \".eth\")]', header, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
		var link = createDaoLink(headerSpan);
		headerSpan.parentElement.closest("div").appendChild(link);
	}
}

// Create the link element
function createDaoLink(span) {
	var link = document.createElement('a');
  var twitterUserNameArr = span.data.split(" ");
  var ensName;
  for ( var i=0 ; i < twitterUserNameArr.length; i++ ) {
    if (twitterUserNameArr[i].includes(".eth")) {
      ensName = twitterUserNameArr[i].replace(/[^\w.]/gi, '');
    }
  }
	link.href = `https://daopanel.chat/${encodeURIComponent(ensName)}`;
	link.setAttribute('target', '_blank');
	link.classList.add('daopanel-link');

	var icon = document.createElement('img');
	icon.classList.add('daopanel-tag');
	icon.src = chrome.runtime.getURL('tag.png');

	link.appendChild(icon);
	return link;
}

// Find all spans containing .eth - don't use this for now, too broad.
function appendDaoLinks() {
	var spans = document.evaluate('//text()[contains(., \".eth\")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for ( var i=0 ; i < spans.snapshotLength; i++ ) {
		var span = spans.snapshotItem(i);

		// check that span is new / has not been seen before
		if (!span.parentElement.hasAttribute(customTag)) { 

			var link = createDaoLink(span);
			span.parentElement.appendChild(link);
			
			// tag the span
			//span.parentElement.setAttribute(customTag, true);
		}
	}
}
