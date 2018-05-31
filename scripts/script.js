// script.js

function createTickets(ticketString) {
	console.log("createTickets()");
	var numbersPerTicket = 15;
	var digitsPerNumber  = 2;
	var digitsPerTicket = numbersPerTicket * digitsPerNumber;
	var numTickets = ticketString.length / digitsPerTicket;
	var tickets = [ticketString.length / digitsPerTicket];
	var start = 0;
	var end   = digitsPerTicket;
	var index = 0;
	for (var i = 0; i < ticketString.length && index < numTickets; ++i) {
		tickets[index++] = ticketString.substring(start, end);
		start = end;
		end += digitsPerTicket;
	}
	for (var i = 0; i < tickets.length; ++i) {
		var arr = [];
		index = 0;
		for (var j = 0; j < tickets[i].length; j += 2)
			arr[index++] = tickets[i].substring(j, j + 2);
		tickets[i] = arr;
	}
	return tickets;
}

function drawTickets(tickets) {
	console.log("drawTickets()");
	for (var i = 0; i < tickets.length; ++i)
		console.log("Ticket[" + i + "]: " + tickets[i]);
}
