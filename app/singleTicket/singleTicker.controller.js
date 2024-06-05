import { ticketsService } from "../services/tickets.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { usersService } from "../services/users.service.js";

const urlObj = new URL(window.location.href);
const params = new URLSearchParams(urlObj.searchParams);
const ticketID = params.get("id");

export const singelTicket = {
  displayTicketInfo,
};

const button = document.querySelector(".button");
const deleteButton = document.querySelector(".delete");
const purchaseButton = document.getElementById("purchaseButton");

const elemTicketCardContainer = document.querySelector(
  ".ticket_card_container"
);

let ticket;
let currentUser;

window.onload = onInit;

async function onInit() {
  window.purchaseTicket = purchaseTicket;
  displayTicketInfo();

  deleteButton.addEventListener("click", async function (event) {
    onDeleteTicket();
    event.preventDefault();
  });

  try {
    currentUser = await usersService.getCurrentUser();
    console.log(currentUser);
  } catch (error) {
    console.log(error);
  }

}

async function onDeleteTicket() {
  try {
    const res = await ticketsService.deleteTicket(ticket.id);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function purchaseTicket() {
  try {
    const res = await ticketsService.purchaseTicket(ticket, currentUser.id);
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
  <div><button id="purchaseButton" onclick="purchaseTicket()"> <i class="fa-solid fa-cart-shopping"></i> Buy</button> </div>
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