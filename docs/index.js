
var amount = document.querySelector('.payment-widget input[name=amount]');
var paymentWidget = document.querySelector('.payment-widget');
var showFormButton = document.querySelector('.show-form');
var ticket = document.querySelector('.ticket');
var form = document.querySelector('.form');
var venderSelect = document.querySelector('.vender-select');
var lunchCheck = document.querySelector('input[name="Lunch"]');
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
	Astatine.submit({
		query: form,
		method: 'post',
		responseType: 'json',
		action: 'https://www.enformed.io/zpn17s0',
		prepare: function (data, resolve, reject) {

			if (!data['*default_email']) {
				data['*default_email'] = 'tnwf@live.com';
			}

			if (venderSelect) total = venderSelect.value;
			if (lunchCheck && lunchCheck.checked) total = Number(total) + 45;

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
		complete: function (error, success) {
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
						var formName = document.querySelector('input[name="*formname"]');
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
	Astatine.submit({
		method: 'post',
		responseType: 'json',
		query: donateForm,
		action: 'https://www.enformed.io/zpn17s0',
		prepare: function (d, resolve, reject) {
			data = d;

			if (!data['*default_email']) {
				data['*default_email'] = 'tnwf@live.com';
			}
			
			if (data['Amount'] == 0) {
				reject('Error: requires a donation amount');
			} else {
				resolve(data);
			}
		},
		complete: function (error, success) {
			var response = document.querySelector('.response');
			if (error) {
				if (typeof error === 'string') {
					response.style.color = 'orange';
					response.innerText = error;
				} else {
					response.style.color = 'red';
					response.innerText = 'Error: please see console';
					console.error(error);
				}
			} else {
				response.style.color = '#6db4b1';
				response.innerText = 'Donation Is Sent';

				var paymentWidget = document.querySelector('.payment-widget');
				var itemName = document.querySelector('.payment-widget input[name="item_name"]');
				var amount = document.querySelector('.payment-widget input[name="amount"]');
				var handlePayment = function () { paymentWidget.style.display = 'none'; };
				var onlineButton = document.querySelector('.online-button');
				var offlineButton = document.querySelector('.offline-button');

				itemName.value = data['Form Name'];
				amount.value = data['Amount'].toString();

				paymentWidget.style.display = 'block';
				onlineButton.addEventListener('click', handlePayment);
				offlineButton.addEventListener('click', handlePayment);
			}
		}
	});
}

var gallery = document.querySelector('.gallery-fab50');
if (gallery) {
	Astatine.ajax({
		method: 'get',
		action: 'https://res.cloudinary.com/dbc2wlvk8/image/list/fab50_2017.json',
		success: function (xhr) {
			var list = JSON.parse(xhr.response);
			var largeImages = [];
			var smallImages = [];

			for (var i = 0, l = list.resources.length; i < l; i++) {
				var item = list.resources[i];
				largeImages.push('https://res.cloudinary.com/dbc2wlvk8/image/upload/f_auto/' + item.public_id + '.' + item.format);
				smallImages.push('https://res.cloudinary.com/dbc2wlvk8/image/upload/w_150,f_auto/' + item.public_id + '.' + item.format);
			}

			erbium.gallery.create('.gallery-fab50', largeImages, smallImages);
		},
		error: function (xhr) {
			console.log(xhr);
		}
	});
}
