(function() {
  var profileId = document.querySelector('#profile-id') || null;
  var profileUsername = document.querySelector('#profile-username') || null;
  var profileRepos = document.querySelector('#profile-repos') || null;
  var displayName = document.querySelector('#display-name');
  var apiUrl = appUrl + '/api/user/:id';

  function updateHtmlElement(data, element, userProperty) {
    element.innerHTML = data[userProperty];
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
    var userObject = JSON.parse(data);

    updateHtmlElement(userObject, displayName, 'screenName');

    if (profileId !== null)
      updateHtmlElement(userObject, profileId, 'id');

    if (profileUsername !== null)
      updateHtmlElement(userObject, profileUsername, 'name');

    if (profileRepos !== null)
      updateHtmlElement(userObject, profileRepos, 'publicRepos');
  }))
})();
