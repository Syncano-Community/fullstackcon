$(function() {

  // variable declarations

  var instanceName = null
  var apiKey = null;
  var connection = null;
  var $instanceName = $('#instance-name');
  var $apiKey = $('#api-key');
  var $noUserInfo = $("#noUserInfo");
  var $accountMessage = $('#account-message');
  var $accountModal = $('#account-modal');
  var $linkModal = $('#link-modal');
  var $linkAccount = $('#link-account');
  var $addLink = $('#add-link');
  var $linkModal = $('#link-modal');
  var $links = $('.links');
  var $linkTitle = $('#link-title');
  var $linkUrl = $('#link-url');

  // element templates

  var linkTemplate = "<li><div class='arrow upvote' id='{id}'></div><a href='{url}' target='_blank'>{title}</a>({upvotes})</li>";

  // open 'Link Account' modal

  $linkAccount.click(function() {
    $accountModal.openModal();
  });

  // listen to the 'submit' event of the Account modal

  $accountModal.on('submit', function(e) {
    e.preventDefault();
    instanceName = $instanceName.val();
    apiKey = $apiKey.val();
    connectAccount();
  });

  // open 'Add Link' modal

  $addLink.click(function() {
    $linkModal.openModal();
  });

  // listen to the 'submit' event of the Link modal

  $linkModal.on('submit', function(e) {
    e.preventDefault();
    var link = {
      title: $linkTitle.val(),
      url: $linkUrl.val(),
      upvotes: 0
    }
    addLink(link);
  });

  // create Link via DataEndpoint

  function addLink(link) {
    console.log('SyncanoNews::addLink');
    connection.DataEndpoint.please().createDataObject({ name: 'get_news_items'}, link)
      .then(function() {
        getLinks();
        $linkModal.closeModal();
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  // get user credentials from localStorage (if they exist)

  function getCredentials() {
    console.log('SyncanoNews::getCredentials');
    instanceName = localStorage.instanceName || '';
    apiKey = localStorage.apiKey || '';
    $instanceName.val(instanceName);
    $apiKey.val(apiKey);
    if(instanceName && apiKey) {
      connectAccount();
    } else {
      $noUserInfo.show();
    }
  }

  // connect to Syncano

  function connectAccount() {
    console.log('SyncanoNews::connectAccount');
    connection = Syncano({ apiKey: apiKey, defaults: { instanceName: instanceName, className: 'news_item' }});
    $noUserInfo.hide();
    $accountMessage.css('color', 'green').text('Account successfully linked!');
    $linkAccount.hide();
    localStorage.apiKey = apiKey;
    localStorage.instanceName = instanceName;
    getLinks();
  }

  // get and display links

  function getLinks() {
    console.log('SyncanoNews::getLinks');
    $links.empty();
    connection.DataEndpoint.please().fetchData({name: 'get_news_items'})
      .then(function(links) {
        links.forEach(function(link) {
          var element = linkTemplate
                          .replace('{id}', link.id)
                          .replace('{url}', link.url)
                          .replace('{title}', link.title)
                          .replace('{upvotes}', link.upvotes);
          $links.prepend(element);
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  // listen for clicks on the upvote arrows and upvote the links

  $links.on('click', '.upvote', function(e) {
    console.log('SyncanoNews::upvote');
    connection.DataObject.please().increment({ id: e.target.id }, { upvotes: 1 })
      .then(function() {
        getLinks();
      })
      .catch(function(error) {
        console.error(error);
      });
  });

  // start the app

  getCredentials();

});
