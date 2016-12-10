document.addEventListener('DOMContentLoaded', function () {
	var amount = document.querySelector('.payment-widget input[name=amount]');
	var paymentWidget = document.querySelector('.payment-widget');
	var showFormButton = document.querySelector('.show-form');
	var ticket = document.querySelector('.ticket');
	var form = document.querySelector('.form');
	var venderSelect = document.querySelector('.vender-select');
	var lunchCheck = document.querySelector('input[name="Lunch"]');
	var total = 0;

	if (showFormButton) {
		showFormButton.addEventListener('click', function () {
			form.style.display = 'block';
		});
	}

	if (ticket) {
		var ticketList = form.querySelector('.ticket-list');
		var ticketFirst = form.querySelector('.ticket-first');
		var ticketLast = form.querySelector('.ticket-last');
		var ticketHidden = form.querySelector('.ticket-hidden');
		var ticketAdd = form.querySelector('.ticket-add');
		var ticketTotal = form.querySelector('.ticket-total');
		var ticketCost = Number(ticketAdd.getAttribute('data-cost'));

		ticketAdd.addEventListener('click', function () {
			if (ticketFirst.value.length !== 0 && ticketLast.value.length !== 0) {
				var li = document.createElement('li');
				var ticket = ticketFirst.value + ' ' + ticketLast.value;

				li.innerText = ticket;
				ticketFirst.value = '';
				ticketLast.value = '';

				if (ticketHidden.value.length === 0) ticketHidden.value = ticket;
				else ticketHidden.value = ticketHidden.value + ', ' + ticket;

				ticketList.appendChild(li);
				total = Number(total) + ticketCost;
				ticketTotal.value = total.toString();
			} else {
				window.alert('First Name and Last Name are required');
			}
		});
	}

	if (form) {
		Astatine.submit({
			query: form,
			mimeType: 'json',
			prepare: function (data) {

				if (data._cc) data._cc = data._cc + ',cmactnwf@cox.net,cmiller2@email.arizona.edu ';
				else data._cc = 'cmactnwf@cox.net,cmiller2@email.arizona.edu ';

				if (venderSelect) total = venderSelect.value;
				if (lunchCheck && lunchCheck.checked) total = Number(total) + 45;

				if (paymentWidget) {
					var itemName = document.querySelector('input[name="item_name"]');
					var handlePayment = function () { paymentWidget.style.display = 'none'; };
					var onlineButton = document.querySelector('.online-button');
					var offlineButton = document.querySelector('.offline-button');
					var formName = document.querySelector('input[name="Form Name"]');

					if (total == 0) {
						window.alert('Requires at least one individual. Please refresh page. Be sure to save your work first.');
						throw new Error('Requires at least one individual. Please refresh page. Be sure to save your work first.');
					} else {
						itemName.value = formName.value;
						amount.value = total.toString();
						paymentWidget.style.display = 'block';
						onlineButton.addEventListener('click', handlePayment);
						offlineButton.addEventListener('click', handlePayment);
					}
				}

			},
			complete: function (error, success) {
				var response = document.querySelector('.response');

				if (error) {
					console.log(error);
					response.style.color = 'red';
					response.innerText = 'Error';
				} else {
					form.style.display = 'none';
					response.style.color = '#6db4b1';
					response.innerText = 'Form Is Submitted';
				}

			}
		});
	}

});
