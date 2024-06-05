import { ticketsService } from "../services/tickets.service.js";
import { navBarHandler } from "../services/navbar.service.js";

export const singelTicket = {
  displayTicketInfo
};

const button = document.querySelector(".button");
const deleteButton = document.querySelector(".delete");

const elemTicketCardContainer = document.querySelector(
  ".ticket_card_container"
);

let ticket;

window.onload = onInit;

function onInit() {
  button.addEventListener("click", async function (event) {
    await displayTicketInfo();
    event.preventDefault();
  });

  deleteButton.addEventListener("click", async function (event) {
    onDeleteTicket();
    event.preventDefault();
  });
}

async function onDeleteTicket() {
  try {
    const res = await ticketsService.deleteTicket(ticket.id);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function displayTicketInfo() {
  ticket = await ticketsService.getTicketById("c536");
  console.log(ticket);
  elemTicketCardContainer.innerHTML = `
  <h2>Title: ${ticket.title}</h2>

  <i class="fa-solid fa-ticket"></i><p>Seller : ${ticket.user?.fname}</p>
  <p>Category: ${ticket.category}</p>
  <p>Date: ${ticket.date}</p>
  <p>Price: $${ticket.price}</p>
  <p>Location: ${ticket.location}</p>
  <p>Serial Number: ${ticket.serialnumber}</p>`;
}
