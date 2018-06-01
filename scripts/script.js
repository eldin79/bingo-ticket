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
	for (var i = 0; i < tickets.length; ++i) {
		console.log("Ticket[" + i + "]: " + tickets[i]);
		var ticket = tickets[i];
		var ticketInfo = "Ticket " + (i + 1) + ": " + ticket;
		
		var img    = document.createElement("img");
		img.src    = "images/ticket.png";
		img.alt	   = ticketInfo;
		
		for (var j = 0; j < ticket.length; ++j) {
			var numValue = Number(ticket[j]);
			var indexValue = numValue - 1;
			var colIndex = Math.floor(indexValue / 10);
			var rowIndex = Math.floor(indexValue % 10);
			console.log("numValue: " + numValue + "  " + 
						"colIndex: " + colIndex + "  " +
						"rowIndex: " + rowIndex);
		}

		document.getElementById("ticketDiv").appendChild(img);
		document.getElementById("ticketDiv").appendChild(document.createElement("br"));
	}
}

function getTickets() {
	var ticketString = "011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985";
	var tickets = createTickets(ticketString);
	drawTickets(tickets);
}

window.onload = function() {
	console.log("window.onload = getTickets()");
	getTickets();
}
