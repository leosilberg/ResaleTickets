import { ticketsService } from "../services/tickets.service.js";
import { navbarServices } from "../services/navbar.service.js";
const urlObj = new URL(window.location.href);
const params = new URLSearchParams(urlObj.searchParams);
const ticketID = params.get("id");

export const singelTicket = {
  displayTicketInfo,
  openPaymentDetails
};

const button = document.querySelector(".button");
const deleteButton = document.querySelector(".delete");

const elemTicketCardContainer = document.querySelector(
  ".ticket_card_container"
);

let ticket;

window.onload = onInit;

function onInit() {
  displayTicketInfo();

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
  ticket = await ticketsService.getTicketById(ticketID);
  console.log(ticket);
  elemTicketCardContainer.innerHTML = `
  <div class="header_and_button_wrapper">
  <h2><i class="fa-solid fa-ticket"></i>  ${ticket.title}</h2>
  <div><button onClick="openPaymentDetails()"> <i class="fa-solid fa-cart-shopping"></i> Buy</button> </div>
  </div>
  <p>Seller : ${ticket.user?.fname}</p>
  <p>Category: ${ticket.category}</p>
  <p>Date: ${ticket.date}</p>
  <p>Price: $${ticket.price}</p>
  <p>Location: ${ticket.location}</p>
  <p>Serial Number: ${ticket.serialnumber}</p>`;
}

function openPaymentDetails() {
  window.location.href = "../paymentDetails/paymentDetails.html";
}