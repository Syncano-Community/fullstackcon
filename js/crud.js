$(document).ready(function() {
	if (apiKey && instanceName) {
		getLinks();
	}
});

$('#add-link').on('click', function() {
	$('#link-modal').openModal();
});

$('#link-submit').on('click', function(e) {
	e.preventDefault();
	addLink();
});

function getLinks() {
	$('.links').empty();
	connection.DataObject.please()
		.list({instanceName: localStorage.instanceName, className: "news_item"}).orderBy("upvotes").then(function(links) {
			links.forEach(function(link) {
				$('.links').prepend("<li><div class='arrow upvote' id='"+link.id+"'></div><a href='"+link.url+"'>"+link.title+"</a>"+" ("+link.upvotes+")</li>")
			});	
			$('.upvote').on('click', function() {
				upvote(this.id);
			});
	})
	.catch(function(error) {
		if (error.status === 404) {
			$('.links').prepend('<p style="text-align:center;">No news items available.</p>');
		}
	});
}

function upvote(id) {
	var query = {id: id, instanceName: localStorage.instanceName, className: "news_item"};
	connection.DataObject.please().update(query, {upvotes: {_increment: 1}}).then(function(link) {
		getLinks();
	});
}

function addLink() {
	var link = {title: $("#link-title").val(), url: $('#link-url').val(), upvotes: 0, instanceName: localStorage.instanceName, className: "news_item"};
	connection.DataObject.please().create(link).then(function(link) {
		getLinks();
		$('#link-modal').closeModal();
	})
	.catch(function(error) {
		console.log(error);
	});
}

