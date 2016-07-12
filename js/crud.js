$(document).ready(function() {
	getLinks();
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
				$('.links').prepend("<li><i class='material-icons upvote' id='"+link.id+"'>arrow_upward</i><a href='"+link.url+"'>"+link.title+"</a>"+" ("+link.upvotes+")</li>")
			});	
			$('.upvote').on('click', function() {
				upvote(this.id);
			});
	})
	.catch(function(error) {
		if (error.status === 404) {
			$('.links').prepend('<p>No news items available.</p>');
		}
	});
}

function upvote(id) {
	let query = {id: id, instanceName: localStorage.instanceName, className: "news_item"};
	connection.DataObject.please().update(query, {upvotes: {_increment: 1}}).then(function(link) {
		getLinks();
	});
}

function addLink() {
	let link = {title: $("#link-title").val(), url: $('#link-url').val(), upvotes: 0, instanceName: localStorage.instanceName, className: "news_item"};
	connection.DataObject.please().create(link).then(function(link) {
		getLinks();
		$('#link-modal').closeModal();
	})
	.catch(function(error) {
		console.log(error);
	});
}

