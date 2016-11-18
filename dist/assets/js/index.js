(function() {
'use strict';

function offlineButtonRender () {
	var offlineButton = document.querySelector('.offline-button');
	var paymentWidget = document.querySelector('.payment-widget');
	offlineButton.addEventListener('click', function () {
		paymentWidget.style.display = 'none';
	});
}

function onlineButtonRender (total) {
	var paymentWidget = document.querySelector('.payment-widget');
	paypal.Button.render({
		env: 'sandbox', // production, sandbox
		commit: true,
		client: {
			sandbox: 'AYYG8wFherEY7ZmyS1biclrOmhxsNKxdNoyOwk85_sKve83LNTeHjAk2GP4Lxu0nqS5n1v4IZn2CFfZs'
		},
		payment: function() {
			var env    = this.props.env;
			var client = this.props.client;

			return paypal.rest.payment.create(env, client, {
				transactions: [{
					amount: { total: total, currency: 'USD' }
				}]
			});
		},
		onAuthorize: function(data, actions) {
			return actions.payment.execute().then(function() {
				paymentWidget.style.display = 'none';
			});
		}

	}, '.paypal-button');
}

document.addEventListener('DOMContentLoaded', function () {
	var paymentWidget = document.querySelector('.payment-widget');
	var showFormButton = document.querySelector('.show-form');
	var form = document.querySelector('.form');
	var total = 0;

	if (showFormButton) {
		var form = document.querySelector('.form');
		showFormButton.addEventListener('click', function () {
			form.style.display = 'block';
		});
	}

	if (form) {
		if (document.querySelector('.ticket')) {
			var ticketList = form.querySelector('.ticket-list');
			var ticketFirst = form.querySelector('.ticket-first');
			var ticketLast = form.querySelector('.ticket-last');
			var ticketHidden = form.querySelector('.ticket-hidden');
			var ticketAdd = form.querySelector('.ticket-add');
			var ticketTotal = form.querySelector('.ticket-total');
			var ticketCost = Number(ticketAdd.getAttribute('data-cost'));

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
			prepare: function (data) {
				if (paymentWidget) {
					offlineButtonRender();
					onlineButtonRender(data.Total.toString());
					paymentWidget.style.display = 'block';
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
					response.style.color = 'green';
					response.innerText = 'Form Is Submitted';
				}

			}
		});
	}

});
}());
