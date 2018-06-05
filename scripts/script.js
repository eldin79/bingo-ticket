// script.js

function createTickets(ticketString) {
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
	for (var i = 0; i < tickets.length; ++i) {
		tickets[i].sort();
	}
	return tickets;
}

function drawTickets(tickets) {
	// set canvas and context properties
	var canvas 			= document.getElementById("canvas");
	var imgHeight 		= 73;
	var ticketYOffset 	= 26;
	canvas.height 		= tickets.length * (imgHeight + ticketYOffset);
	var ctx 			= canvas.getContext("2d");
	
	for (var i = 0; i < tickets.length; ++i) {
		var ticket 		 = tickets[i];
		var ticketInfo 	 = "Ticket " + (i + 1) + ": " + ticket;
		var ticketsDrawn = 0;
		
		// load image data
		var img = document.createElement("img");
		img.src = "images/ticket.png";
		img.alt	= ticketInfo;
		img.id 	= "ticket_" + i;
		
		img.onload = function() {
			var ticket = tickets[ticketsDrawn];
			var numValuesPerColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			
			// calculate how many of each group of numbers are in ticket
			// group of numbers = {[1-9], [10-19], [20-29], ... [70-79], [80-90]}
			for (var j = 0; j < ticket.length; ++j) {
				var numValue = Number(ticket[j]);
				var indexValue = numValue;// - 1;
				if (indexValue == 90)
					indexValue = 89;
				var colIndex = Math.floor(indexValue / 10);
				numValuesPerColumn[colIndex]++;
			}
			
			// variables for keeping track of filled squares
			var currEmpty  = 0;
			var prevFilled = 0;
			
			for (var j = 0; j < ticket.length; ++j) {
				var numValue = Number(ticket[j]);
				var indexValue = numValue;
				if (indexValue == 90)
					indexValue = 89;
				var colIndex = Math.floor(indexValue / 10);
				var rowIndex = 0;
				
				if (numValuesPerColumn[colIndex] == 3) {
					// all 3 values are consecutive in ticket array
					rowIndex = currEmpty;
					currEmpty++;
					if (currEmpty >= 3) {
						currEmpty = 0;
					}
				} else if (numValuesPerColumn[colIndex] == 2) {
					// 2 values
					// smaller values tend to be placed in upper two squares
					//  larger values tend to be placed in lower two squares
					if (currEmpty == 0) {
						rowIndex = getRandomInt(2);
						prevFilled = rowIndex;
						currEmpty++;
					} else {
						do {
							rowIndex = getRandomInt(2) + 1;
						} while (rowIndex == prevFilled);
						prevFilled = 0;
						currEmpty = 0;
					}
				} else {
					// only 1 value so pick any square
					rowIndex = getRandomInt(3);
				}
				
				// set offsets for printing text within ticket squares
				var xOffset1 = 27;
				var yOffset1 = 30;	// centre of top-left square
				var xOffset2 = 28.45;
				var yOffset2 = 28; 	// distance between square centres
				var textX = xOffset1 + xOffset2 * colIndex;
				var textY = yOffset1 + yOffset2 * rowIndex;
				
				// adjust offsets for certain columns
				if (colIndex == 1)
					textX--;
				else if (colIndex == 8)
					textX++;

				// draw ticket image
				var imgWidth 		= 257;
				var imgHeight 		= 73;
				var finalWidth 		= 350;
				var imgX 			= 0;
				var ticketYOffset 	= 26;
				var imgY = ticketsDrawn * (imgHeight + ticketYOffset);
				if (j == 0)
					ctx.drawImage(img, imgX, imgY, finalWidth, (finalWidth/imgWidth) * imgHeight);
				
				// draw ticket number
				ctx.font = '20px sans-serif';
				ctx.fillText(ticket[j], imgX + textX, imgY + textY);
				console.log();
			}
			ticketsDrawn++;
		}
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getTickets() {
	var ticketString = "011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985";
	var tickets = createTickets(ticketString);
	drawTickets(tickets);
}

window.onload = function() {
	getTickets();
}
