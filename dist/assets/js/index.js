(function() {
'use strict';
document.addEventListener('DOMContentLoaded', function () {

	var form = document.querySelector('.form');

	if (form) {

		var ticket = form.querySelector('.ticket');

		if (ticket) {
			var ticketList = form.querySelector('.ticket-list');
			var ticketFirst = form.querySelector('.ticket-first');
			var ticketLast = form.querySelector('.ticket-last');
			var ticketHidden = form.querySelector('.ticket-hidden');
			var ticketAdd = form.querySelector('.ticket-add');
			var ticketTotal = form.querySelector('.ticket-total');

			var ticketCost = Number(ticketAdd.getAttribute('data-cost'));

			var total = 0;

			ticketAdd.addEventListener('click', function () {
				var li = document.createElement('li');
				var ticket = ticketFirst.value + ' ' + ticketLast.value;

				li.innerText = ticket;
				ticketFirst.value = '';
				ticketLast.value = '';

				if (ticketHidden.value.length === 0) ticketHidden.value = ticket;
				else ticketHidden.value = ticketHidden.value + ', ' + ticket;

				ticketList.appendChild(li);

				total = total + ticketCost;

				ticketTotal.value = total;
			});
		}

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
					form.style.display = 'none';
					response.style.color = 'green';
					response.innerText = 'Form Is Submitted';
				}

			}
		});
	}

});
}());
