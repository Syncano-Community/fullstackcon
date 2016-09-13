var connection, apiKey, instanceName;
var $noUserInfo = $("#noUserInfo");

if (localStorage.apiKey) {
	$('#api-key').val(localStorage.apiKey);
}
if (localStorage.instanceName) {
	$('#instance-name').val(localStorage.instanceName);
}

if (localStorage.apiKey && localStorage.instanceName) {
	connectAccount();
} else {
	$noUserInfo.show();
}

$('#account-submit').on('click', function() {
	connectAccount();
});

$('#link-account').on('click', function() {
	$('#account-modal').openModal();
});

function connectAccount() {
	apiKey = $('#api-key').val() || localStorage.apiKey;
	instanceName = $('#instance-name').val() || localStorage.instanceName;

	if (apiKey && instanceName) {
		$noUserInfo.hide();
		connection = new Syncano({apiKey: apiKey, defaults:{instanceName:instanceName}});
		$('#account-message').css('color', 'green');
		$('#account-message').text('Account successfully linked!');
		localStorage.apiKey = apiKey;
		localStorage.instanceName = instanceName;
	} else {
		$('#account-message').css('color', 'red');
		$('#account-message').text('Not enough information to link your account. Please try again.');
	}
}

