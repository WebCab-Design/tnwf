
var response = document.querySelector('.response');
var form = document.querySelector('form');
var ticketList;
var total = 0;

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
		// console.log(ticketList.lastElementChild, ticketList.firstElementChild);
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

var showFormButton = document.querySelector('.show-form');
if (showFormButton) {
	showFormButton.addEventListener('click', function () {
		form.style.display = 'block';
	});
}

if (form) {
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		var target = e.target;
		var body = Object.fromEntries(new FormData(target));

		if (!body.$name) {
			throw new Error('$name required');
		}

		body.$domain = 'tucsonnursesweekfoundation.org';
		// body.$to = 'alex.steven.elias@gmail.com';
		body.$to = 'tnwf@live.com';
		body.$cc = 'angie.bush@tmcaz.com';

		var payBody, emailBody;
		if ('amount' in body) {
			var error;

			if (!body.cvc) error = 'Error: missing cvc';
			if (!body.name) error = 'Error: missing name';
			if (!body.year) error = 'Error: missing year';
			if (!body.email) error = 'Error: missing email';
			if (!body.month) error = 'Error: missing month';
			if (!body.number) error = 'Error: missing number';
			if (body.amount == 0) error = 'Error: amount required';

			if (error) {
				response.style.color = 'orange';
				response.innerText = error;
				return;
			}

			payBody = {
				item: body.$name,
				cvc: body.cvc,
				name: body.name,
				year: body.year,
				email: body.email,
				month: body.month,
				number: body.number,
				amount: body.amount
			};

			delete body.cvc;
			delete body.name;
			delete body.year;
			delete body.email;
			delete body.month;
			delete body.number;

			emailBody = Object.keys(body).length ? body : null;
		} else {
			emailBody = body;
		}

		Promise.resolve().then(function () {
			if (payBody) return Post('/pay', payBody);
		}).then(function () {
			if (emailBody) return Post('/email', emailBody);
		}).then(function () {
			response.style.color = '#6db4b1';
			response.innerText = 'Form Is Submitted';
			target.reset();
		});
   });
}
