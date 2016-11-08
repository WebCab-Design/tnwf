(function() {
'use strict';
document.addEventListener('DOMContentLoaded', function () {

	var form = document.querySelector('.form');

	if (form) {
		var guestList = form.querySelector('.guest-list');
		var guestFirst = form.querySelector('.guest-first');
		var guestLast = form.querySelector('.guest-last');
		var guestHidden = form.querySelector('.guest-hidden');
		var guestAdd = form.querySelector('.guest-add');
		var guestTotal = form.querySelector('.guest-total');

		var guestCost= Number(guestAdd.getAttribute('data-cost'));

		var total = 0;

		guestAdd.addEventListener('click', function () {
			var li = document.createElement('li');
			var guest = guestFirst.value + ' ' + guestLast.value;

			li.innerText = guest;
			guestFirst.value = '';
			guestLast.value = '';
			guestHidden.value = guestHidden.value + ', ' + guest;
			guestList.appendChild(li);

			total = total + guestCost;

			guestTotal.innerText = total;
		});

		Astatine.submit({
			query: form,
			mimeType: 'json',
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
	}

});
}());
