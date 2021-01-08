
// var amount = document.querySelector('.payment-widget input[name=amount]');
// var paymentWidget = document.querySelector('.payment-widget');
var form = document.querySelector('form');
// var form = document.querySelector('.form');
var ticketList;
var total = 0;

var HasPay = form && form.dataset.pay === 'yes';

var PayUrl = 'https://2vaid6dwk1.execute-api.us-west-2.amazonaws.com/pay';
var EmailUrl = 'https://2vaid6dwk1.execute-api.us-west-2.amazonaws.com/submit';

var Post = function (url, body) {
	return window.fetch(url, {
		mode: 'cors',
		method: 'POST',
		body: JSON.stringify(body)
	}).then(function (result) {
		return result.json().then(function (body) {
			return { body: body, status: result.status }
		});
	}).then(function (result) {
		if (result.status !== 200) {
			response.style.color = 'orange';
			response.innerText = result.body.message || 'Error: ' + result.status;
			throw new Error(response.innerText);
		} else {
			return result;
		}
	});
};

var showFormButton = document.querySelector('.show-form');
if (showFormButton) {
	showFormButton.addEventListener('click', function () {
		form.style.display = 'block';
	});
}

var ticket = document.querySelector('.ticket');
if (ticket) {
	var amount = form.querySelector('.amount');
	var ticketAdd = form.querySelector('.ticket-add');
	var ticketList = form.querySelector('.ticket-list');
	var ticketInput = form.querySelector('.ticket-input');
	var ticketRemove = form.querySelector('.ticket-remove');
	var ticketCost = Number(ticketAdd.getAttribute('data-cost')) || 0;
	var ticketFree = Number(ticketAdd.getAttribute('data-free')) || 0;

	ticketAdd.addEventListener('click', function () {
		var ticketListItem = document.createElement('li');
		var ticketListInput = ticketInput.cloneNode();
		ticketListInput.value = '';
		ticketListInput.name = ticketListInput.name.replace(/\d+$/, ticketList.children.length+1);
		ticketListItem.appendChild(ticketListInput);
		ticketList.appendChild(ticketListItem);
		amount.value = (ticketList.children.length * ticketCost) - (ticketFree * ticketCost);
	});

	ticketRemove.addEventListener('click', function () {
		console.log(ticketList.lastElementChild, ticketList.firstElementChild);
		if (ticketList.lastElementChild === ticketList.firstElementChild) return;
		ticketList.removeChild(ticketList.lastElementChild);
		amount.value = (ticketList.children.length * ticketCost) - (ticketFree * ticketCost);
	});
}

var registration = document.querySelector('.registration');
if (registration) {
	registration.addEventListener('change', function () {
		var wifi = document.querySelector('.wifi');
		var amount = document.querySelector('.amount');
		amount.value = ((wifi.checked ? 45 : 0) + Number(registration.selectedOptions[0].value));
	});
}

var wifi = document.querySelector('.wifi');
if (wifi) {
	wifi.addEventListener('input', function () {
		var amount = document.querySelector('.amount');
		amount.value = ((wifi.checked ? 45 : 0) + Number(registration.selectedOptions[0].value));
	});
}

if (form) {
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		var response = document.querySelector('.response');
		var target = e.target;
		var body = Object.fromEntries(new FormData(target));

		if (body.$name) {
			throw new Error('$name required');
		}

		body.$domain = 'tucsonnursesweekfoundation.org';
		body.$to = 'alex.steven.elias@gmail.com';
		// body.$to = 'tnwf@live.com, angie.bush@tmcaz.com';

		// if (HasPay) {

			// var vender = document.querySelector('.vender-select');
			// if (vender) total = Number(vender.value);

			// var wifi = document.querySelector('input[name="Wifi"]');
			// if (wifi && wifi.checked) total = total + 45;

		// 	if (ticketList && ticketList.children && ticketList.children.length === 0) {
		// 		response.style.color = 'orange';
		// 		response.innerText = 'Requires at least one individual.';
		// 		return;
		// 	} else {
		// 		if (ticketHidden) body[ticketHidden.name] = ticketHidden.value;
		// 		if (ticketTotal) body[ticketTotal.name] = ticketTotal.value;
		// 	}

		// }

		if (body.amount == 0) {
			response.style.color = 'orange';
			response.innerText = 'Error: donation amount required';
			return;
		}

		Promise.resolve().then(function () {
			return HasPay ? Post(PayUrl, body) : undefined;
		}).then(function () {
			return Post(EmailUrl, body);
		}).then(function () {

			response.style.color = '#6db4b1';
			response.innerText = 'Form Is Submitted';

			// if (paymentWidget) {
			// 	var itemName = document.querySelector('input[name="item_name"]');
			// 	var handlePayment = function () { paymentWidget.style.display = 'none'; };
			// 	var onlineButton = document.querySelector('.online-button');
			// 	var offlineButton = document.querySelector('.offline-button');
			// 	var formName = document.querySelector('input[name="$name"]');
			// 	itemName.value = formName.value;
			// 	amount.value = total.toString();
			// 	paymentWidget.style.display = 'block';
			// 	onlineButton.addEventListener('click', handlePayment);
			// 	offlineButton.addEventListener('click', handlePayment);
			// }

			target.reset();
		});
   });
}

// var donateForm = document.querySelector('.donate-form');
// if (donateForm) {
// 	donateForm.addEventListener('submit', function (e) {
// 		e.preventDefault();

// 		var response = document.querySelector('.response');
// 		var target = e.target;
// 		var body = Object.fromEntries(new FormData(target));

// 		if (body.Amount == 0) {
// 			response.style.color = 'orange';
// 			response.innerText = 'Error: donation amount required';
// 			return;
// 		}

// 		body.$name = 'Donate';
// 		body.$domain = 'tucsonnursesweekfoundation.org';
// 		body.$to = 'alex.steven.elias@gmail.com';
// 		// body.$to = 'tnwf@live.com, angie.bush@tmcaz.com';

// 		Post(EmailUrl, body).then(function () {
// 			response.style.color = '#6db4b1';
// 			response.innerText = 'Donation Is Sent';

// 			var itemName = document.querySelector('.payment-widget input[name="item_name"]');
// 			var amount = document.querySelector('.payment-widget input[name="amount"]');
// 			var handlePayment = function () { paymentWidget.style.display = 'none'; };
// 			var onlineButton = document.querySelector('.online-button');
// 			var offlineButton = document.querySelector('.offline-button');

// 			itemName.value = body['Form Name'];
// 			amount.value = body['Amount'].toString();

// 			paymentWidget.style.display = 'block';
// 			onlineButton.addEventListener('click', handlePayment);
// 			offlineButton.addEventListener('click', handlePayment);

// 			target.reset();
// 		});
// 	});
// }
