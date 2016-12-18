(function() {
  var pollTitle = document.querySelector('#poll-title') || null;
  var pollOwner = document.querySelector('#poll-owner') || null;
  var pollOptions = document.querySelector('#poll-options') || null;
  var pollList = document.querySelector('#poll-list') || null;
  var apiUrl = getApiUrl(window.location.href);//'http://localhost:8080' + '/api/poll?id= ' + (window.location.href); // '/poll/:id' replace hardcoded value

  function updateHtmlElement(data, element, pollProperty) {
    element.innerHTML = data[pollProperty];
  }

  function populateOptions(data, element, pollProperty) {
    var options = data[pollProperty];
    for (var key in options) {
      var optionElement = document.createElement('option');
      optionElement.textContent = key;
      optionElement.value = key;
      element.appendChild(optionElement);
    }
  }

  function populatePollList(data, element, pollProperty) {
    var pollList = data[pollProperty];
    for (var i = 0; i < pollList.length; i++) {
      var poll = pollList[i];
      var pollElement = document.createElement('li');
      var linkElement = document.createElement('a');
      linkElement.textContent = poll.title;
      linkElement.setAttribute('href', appUrl + '/poll?id=' + poll._id);
      pollElement.appendChild(linkElement);
      element.appendChild(pollElement);
    }
  }

  function getApiUrl(currentUrl) {
    var baseUrl = 'http://localhost:8080/api/poll';
    if (currentUrl.indexOf('/poll?id=') != -1) {
      return baseUrl + '?id=' + currentUrl.substring(currentUrl.indexOf('=') + 1);
    }
    return baseUrl;
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
    var pollObject = JSON.parse(data);

    if (pollTitle != null) updateHtmlElement(pollObject, pollTitle, 'title');
    if (pollOwner != null) updateHtmlElement(pollObject, pollOwner, 'owner');
    if (pollOptions != null) populateOptions(pollObject, pollOptions, 'options');
    if (pollList != null) populatePollList(pollObject, pollList, 'polls');
  }))
})();
