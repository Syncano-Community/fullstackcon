var connection, accountKey, instanceName;

if (localStorage.accountKey) {
	$('#account-key').val(localStorage.accountKey);
}
if (localStorage.instanceName) {
	$('#instance-name').val(localStorage.instanceName);
}

if (localStorage.accountKey && localStorage.instanceName) {
	connectAccount();
}

$('#account-submit').on('click', function() {
	connectAccount();
});

$('#link-account').on('click', function() {
	$('#account-modal').openModal();
});

function connectAccount() {
	accountKey = $('#account-key').val() || localStorage.accountKey;
	instanceName = $('#instance-name').val() || localStorage.instanceName;

	if (accountKey && instanceName) {
		connection = new Syncano({accountKey: accountKey});
		$('#account-message').text('Account successfully linked!');
		localStorage.accountKey = accountKey;
		localStorage.instanceName = instanceName;
	} else {
		$('#account-message').text('Not enough information to link your account. Please try again.');
	}
};

