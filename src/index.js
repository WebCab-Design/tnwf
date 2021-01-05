
var amount = document.querySelector('.payment-widget input[name=amount]');
var paymentWidget = document.querySelector('.payment-widget');
var venderSelect = document.querySelector('.vender-select');
var form = document.querySelector('.form');
var ticketList;
var total = 0;

var showFormButton = document.querySelector('.show-form');
if (showFormButton) {
	showFormButton.addEventListener('click', function () {
		form.style.display = 'block';
	});
}

var ticket = document.querySelector('.ticket');
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
			var ticketValue = ticketFirst.value + ' ' + ticketLast.value;

			li.innerText = ticketValue;
			ticketFirst.value = '';
			ticketLast.value = '';

			if (ticketHidden.value.length === 0) ticketHidden.value = ticketValue;
			else ticketHidden.value = ticketHidden.value + ', ' + ticketValue;

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

		var response = document.querySelector('.response');
		var target = e.target;
		var body = Object.fromEntries(new FormData(target));

		if (body.Amount == 0) {
			response.style.color = 'orange';
			response.innerText = 'Error: donation amount required';
			return;
		}

		body.$domain = 'tucsonnursesweekfoundation.org';
		body.$to = 'alex.steven.elias@gmail.com';
		// body.$to = 'tnwf@live.com, angie.bush@tmcaz.com';

		if (venderSelect) total = venderSelect.value;

		var wifi = document.querySelector('input[name="Wifi"]');
		if (wifi && wifi.checked) total = Number(total) + 45;

		if (paymentWidget) {
			if (ticketList && ticketList.children && ticketList.children.length === 0) {
				response.style.color = 'orange';
				response.innerText = 'Requires at least one individual.';
				return;
			} else {
				if (ticketHidden) body[ticketHidden.name] = ticketHidden.value;
				if (ticketTotal) body[ticketTotal.name] = ticketTotal.value;
			}
		}

		var url = 'https://2vaid6dwk1.execute-api.us-west-2.amazonaws.com/submit';
		var options = {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(body)
		};

		window.fetch(url, options).then(function (result) {
			var status = result.status;
			return result.json().then(function (body) {
				return { body, status }
			});
		}).then(function (result) {

			if (result.status !== 200) {
				response.style.color = 'orange';
				response.innerText = result.body.message || 'Error: ' + result.status;
				return;
			}

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

			target.reset();
		});
   });

}

var donateForm = document.querySelector('.donate-form');
if (donateForm) {

	donateForm.addEventListener('submit', function (e) {
		e.preventDefault();

		var response = document.querySelector('.response');
		var target = e.target;
		var body = Object.fromEntries(new FormData(target));

		if (body.Amount == 0) {
			response.style.color = 'orange';
			response.innerText = 'Error: donation amount required';
			return;
		}

		body.$name = 'Donate';
		body.$domain = 'tucsonnursesweekfoundation.org';
		body.$to = 'alex.steven.elias@gmail.com';
		// body.$to = 'tnwf@live.com, angie.bush@tmcaz.com';

		var url = 'https://2vaid6dwk1.execute-api.us-west-2.amazonaws.com/submit';
		var options = {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(body)
		};

		window.fetch(url, options).then(function (result) {
			var status = result.status;
			return result.json().then(function (body) {
				return { body, status }
			});
		}).then(function (result) {

			if (result.status !== 200) {
				response.style.color = 'orange';
				response.innerText = result.body.message || 'Error: ' + result.status;
				return;
			}

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

			target.reset();
		});
	});

}
