import { ticketsService } from "../services/tickets.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { usersService } from "../services/users.service.js";
import { showToast } from "../services/toaster.service.js";
import { paymentsService } from "../services/payments.service.js";

const urlObj = new URL(window.location.href);
const params = new URLSearchParams(urlObj.searchParams);
const ticketID = params.get("id");

export const singelTicket = {
  displayTicketInfo,
};

const button = document.querySelector(".button");
const deleteButton = document.getElementById("deleteButton");
const purchaseButton = document.getElementById("purchaseButton");

const elemTicketCardContainer = document.querySelector(
  ".ticket_card_container"
);

let ticket;
let currentUser;

window.onload = onInit;

async function onInit() {
  ticket = await ticketsService.getTicketById(ticketID);
  console.log(ticket);
  window.purchaseTicket = purchaseTicket;
  window.onDeleteTicket = onDeleteTicket;
  // window. = currentUserValidation;

  currentUser = await navbarServices.checkLogInStatus();
  displayTicketInfo();
  window.onSearchClick = onSearchClick;
}

function onSearchClick() {
  const elemInputSearch = document.getElementById("searchBar");
  location.assign(`../tickets/tickets.html?search=${elemInputSearch.value}`);
}

async function onDeleteTicket() {
  try {
    await ticketsService.deleteTicket(ticket.id);
    showToast("Ticket deleted successfully", "success");
    setTimeout(() => {
      navbarServices.goToUserProfile();
    }, 1500);
  } catch (err) {
    console.log(err);
    showToast("Sorry, cannot delete ticket", "error");
  }
}

async function purchaseTicket() {
  try {
    await ticketsService.purchaseTicket(ticket, currentUser.id);
    await ticketsService.deleteTicket(ticket.id);
    showToast("Ticket purchased", "success");
    setTimeout(() => {
      navbarServices.goToUserProfile();
    }, 1500);
  } catch (err) {
    console.log(err);
    showToast("Sorry, cannot complete the purchase", "error");
  }
}

async function displayTicketInfo() {
  let actionButton;
  if (currentUserValidation(ticket)) {
    actionButton = "";
  } else {
    if (ticket.isonsale) {
      actionButton = `<button id="deleteButton" onclick="onDeleteTicket()"><i class="fa-solid fa-trash-can"></i>  Delete</button>`;
    } else {
      actionButton = "";
    }
  }

  // ticket = await ticketsService.getTicketById(ticketID);
  console.log(ticket);
  elemTicketCardContainer.innerHTML = `
  <h2><i class="fa-solid fa-ticket"></i>  ${ticket.title}</h2>
  <p>Seller : ${ticket.user?.fname} ${ticket.user?.lname}</p>
  <p>Category: ${ticket.category}</p>
  <p>Date: ${ticket.date}</p>
  <p>Price: $${ticket.price}</p>
  <p>Location: ${ticket.location}</p>
  <p>Serial Number: ${ticket.serialnumber}</p>
  <div>${actionButton} </div>`;
  if (currentUser) {
    if (currentUserValidation(ticket)) {
      console.log(currentUser.id);
      if (
        !currentUser.purchasedTickets.some(
          (purchased) => ticket.id === purchased?.id
        )
      ) {
        await paymentsService.loadPayPal(ticket, currentUser.id);
      }
    }
  } else {
    elemTicketCardContainer.querySelector("div").innerText =
      "Please login to proceed!";
  }
}

function currentUserValidation(ticket) {
  return ticket.userId !== currentUser?.id;
}
