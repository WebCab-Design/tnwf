
var amount = document.querySelector('.payment-widget input[name=amount]');
var paymentWidget = document.querySelector('.payment-widget');
var showFormButton = document.querySelector('.show-form');
var ticket = document.querySelector('.ticket');
var form = document.querySelector('.form');
var venderSelect = document.querySelector('.vender-select');
var wifi = document.querySelector('input[name="Wifi"]');
var total = 0;
var ticketList;

if (showFormButton) {
	showFormButton.addEventListener('click', function () {
		form.style.display = 'block';
	});
}

if (ticket) {
	ticketList = form.querySelector('.ticket-list');
	var ticketFirst = form.querySelector('.ticket-first');
	var ticketLast = form.querySelector('.ticket-last');
	var ticketHidden = form.querySelector('.ticket-hidden');
	var ticketAdd = form.querySelector('.ticket-add');
	var ticketTotal = form.querySelector('.ticket-total');
	var ticketCost = Number(ticketAdd.getAttribute('data-cost')) || 0;
	var ticketFirstDiscount = Number(ticketAdd.getAttribute('data-first-discount')) || 0;

	ticketAdd.addEventListener('click', function () {
		var isFirstTicket = ticketList.children.length === 0;

		if (ticketFirst.value.length !== 0 && ticketLast.value.length !== 0) {
			var li = document.createElement('li');
			var ticket = ticketFirst.value + ' ' + ticketLast.value;

			li.innerText = ticket;
			ticketFirst.value = '';
			ticketLast.value = '';

			if (ticketHidden.value.length === 0) ticketHidden.value = ticket;
			else ticketHidden.value = ticketHidden.value + ', ' + ticket;

			ticketList.appendChild(li);
			total = Number(total) + ticketCost - (isFirstTicket ? ticketFirstDiscount : 0);

			if (ticketTotal) ticketTotal.value = total.toString();

		} else {
			window.alert('First Name and Last Name are required');
		}

	});
}

if (form) {

    form.addEventListener('submit', function (e) {
		e.preventDefault();

		var body = Object.fromEntries(new FormData(form));

		body.$name = body.$name || 'Contact';
		body.$domain = 'tucsonnursesweekfoundation.org';
		body.$to = 'tnwf@live.com, angie.bush@tmcaz.com';

		var url = '';
		var options = {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(body)
		};

		window.fetch(url, options)
			.then(function (response) { response.json(); })
			.then(function (data) { console.log(data); })
			.then(function () { form.reset(); })
			.catch(function (error) { console.log(error); });

   });

	Astatine.submit({
		query: form,
		method: 'post',
		requestType: 'json',
		responseType: 'json',
		action: ' https://eboi4z4mni.execute-api.us-west-2.amazonaws.com/default/submit',
		prepare: function (data, resolve, reject) {
			data['$to'] = 'tnwf@live.com, angie.bush@tmcaz.com';

			if (venderSelect) total = venderSelect.value;
			if (wifi && wifi.checked) total = Number(total) + 45;

			if (paymentWidget) {

				if (ticketList && ticketList.children && ticketList.children.length === 0) {
					// if (total == 0) {
					reject('Requires at least one individual.');
				} else {
					if (ticketHidden) data[ticketHidden.name] = ticketHidden.value;
					if (ticketTotal) data[ticketTotal.name] = ticketTotal.value;
					resolve(data);
				}
			} else {
				resolve(data);
			}

		},
		complete: function (error) {
			var responses = document.querySelectorAll('.response');

			for (var i = 0; i < responses.length; i++) {
				var response = responses[i];

				if (error) {

					console.log(error);

					if (typeof error === 'string') {
						response.style.color = 'orange';
						response.innerText = error;
					} else {
						response.style.color = 'red';
						response.innerText = 'Error Please See Console';
					}

				} else {

					form.style.display = 'none';
					response.style.color = '#6db4b1';
					response.innerText = 'Form Is Submitted';

					if (paymentWidget) {
						var itemName = document.querySelector('input[name="item_name"]');
						var handlePayment = function () { paymentWidget.style.display = 'none'; };
						var onlineButton = document.querySelector('.online-button');
						var offlineButton = document.querySelector('.offline-button');
						var formName = document.querySelector('input[name="$name"]');
						itemName.value = formName.value;
						amount.value = total.toString();
						paymentWidget.style.display = 'block';
						onlineButton.addEventListener('click', handlePayment);
						offlineButton.addEventListener('click', handlePayment);
					}

				}

			}

		}
	});
}

var data;
var donateForm = document.querySelector('.donate-form');
if (donateForm) {

	donateForm.addEventListener('submit', function (e) {
		e.preventDefault();

		var response = document.querySelector('.response');
		var body = Object.fromEntries(new FormData(form));

		if (body.Amount == 0) {
			response.style.color = 'orange';
			response.innerText = 'Error: donation amount required';
			return;
		}

		body.$name = body.$name || 'Contact';
		body.$domain = 'tucsonnursesweekfoundation.org';
		body.$to = 'alex.steven.elias@gmail.com';
		// body.$to = 'tnwf@live.com, angie.bush@tmcaz.com';

		var url = 'https://eboi4z4mni.execute-api.us-west-2.amazonaws.com/default/submit';
		var options = {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(body)
		};

		window.fetch(url, options).then(function (result) {
				return result.json();
			}).then(function (data) {
				console.log(data);
			}).then(function () {
				response.style.color = '#6db4b1';
				response.innerText = 'Donation Is Sent';

				var paymentWidget = document.querySelector('.payment-widget');
				var itemName = document.querySelector('.payment-widget input[name="item_name"]');
				var amount = document.querySelector('.payment-widget input[name="amount"]');
				var handlePayment = function () { paymentWidget.style.display = 'none'; };
				var onlineButton = document.querySelector('.online-button');
				var offlineButton = document.querySelector('.offline-button');

				itemName.value = body['Form Name'];
				amount.value = body['Amount'].toString();

				paymentWidget.style.display = 'block';
				onlineButton.addEventListener('click', handlePayment);
				offlineButton.addEventListener('click', handlePayment);

				form.reset();
			}).catch(function (error) {
				response.style.color = 'red';
				response.innerText = 'Error: please see console';
				console.error(error);
			});

	});

}
