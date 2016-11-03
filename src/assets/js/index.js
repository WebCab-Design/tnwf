(function() {
	'use strict';

	At.submit({
		mimeType: 'json',
		query: '.form',
		complete: function (error, success) {
			var response = document.querySelector('.response');

			if (error) {
				console.log(error);
				response.style.color = 'red';
				response.innerText = 'Error';
			} else {
				response.style.color = 'green';
				response.innerText = 'Form Is Submitted';
			}

		}
	});

}());
