var connection, apiKey, instanceName;

if (localStorage.apiKey) {
	$('#api-key').val(localStorage.apiKey);
}
if (localStorage.instanceName) {
	$('#instance-name').val(localStorage.instanceName);
}

if (localStorage.apiKey && localStorage.instanceName) {
	connectAccount();
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
		connection = new Syncano({apiKey: apiKey});
		$('#account-message').text('Account successfully linked!');
		localStorage.apiKey = apiKey;
		localStorage.instanceName = instanceName;
	} else {
		$('#account-message').text('Not enough information to link your account. Please try again.');
	}
};

