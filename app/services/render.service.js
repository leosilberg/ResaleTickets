export const renderService = {
  displayTickets,
};
function displayTickets(tickets, ticketContainer) {
  if (tickets.length === 0) {
    ticketContainer.innerHTML =
      "Can't find what you're looking for, try something else.";
  } else {
    tickets.forEach((ticket) => {
      console.log(ticket);
      const ticketElement = document.createElement("div");
      ticketElement.classList.add("ticket_card");
      let sellerInfo = "";
      if (ticket.user?.fname !== undefined) {
        sellerInfo = `<div class="ticket_seller">Seller: ${ticket.user.fname} ${ticket.user.lname}</div>`;
      }
      ticketElement.innerHTML = `
              <div class="ticket_date">
                      <div>${formatDate(ticket.date)}</div>
                      <div>${ticket.time}</div>
                  </div>
                  <div class="ticket_info">
                  <div class="ticket_seller">Category: ${ticket.category}</div>
                      <div class="ticket_title">${ticket.title}</div>
                      <div class="ticket_location">${ticket.location}</div>
                      ${sellerInfo}
                  </div >
            <div class="ticket_action">
                <a href="../singleTicket/singleTicket.html?id=${
                  ticket.id
                }" class="see_tickets">See tickets</a>`;
      ticketContainer.appendChild(ticketElement);
    });
  }
}

function formatDate(dateString) {
  const options = { weekday: "short", month: "short", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options).toUpperCase();
}
