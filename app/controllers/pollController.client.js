(function() {
  var pollTitle = document.querySelector('#poll-title') || null;
  var pollOwner = document.querySelector('#poll-owner') || null;
  var pollOptions = document.querySelector('#poll-options') || null;
  var pollList = document.querySelector('#poll-list') || null;
  var apiUrl = 'http://localhost:8080' + '/api/poll/'; // '/poll/:id' replace hardcoded value

  function updateHtmlElement(data, element, pollProperty) {
    element.innerHTML = data[userProperty];
  }

  function populateOptions(data, element, pollProperty) {
    var options = data[pollProperty];
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      var optionElement = document.createElement('option');
      optionElement.textContent = options.optionText;
      optionElement.value = options.optionText;
      element.appendChild(optionElement)
    }
  }

  function populatePollList(data, element, pollProperty) {
    var pollList = data[pollProperty];
    for (var i = 0; i < pollList.length; i++) {
      var poll = pollList[i];
      var pollElement = document.createElement('li');
      pollElement.innerHTML = poll.title;
      pollElement.href = appUrl + '/api/poll/' + poll._id;
      element.appendChild(pollElement);
    }
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
    var pollObject = JSON.parse(data);

    if (pollTitle != null) updateHtmlElement(pollObject, pollTitle, 'title');
    if (pollOwner != null) updateHtmlElement(pollObject, pollOwner, 'owner');
    if (pollOptions != null) populateOptions(pollObject, pollOptions, 'options');
    if (pollList != null) populatePollList(pollObject, pollList, 'polls');
  }))
})();
