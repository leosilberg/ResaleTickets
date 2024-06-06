import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { renderService } from "../services/render.service.js";
import { ticketsService } from "../services/tickets.service.js";

// const urlObj = new URL(window.location.href);
// const params = new URLSearchParams(urlObj.searchParams);
// const userID = params.get("id");
let currentUser;
const elemUserProfile = document.querySelector(".user_profile");
const elemTicketTable = document.querySelector(
  ".tickets_list"
);

window.onload = onInit;

async function onInit() {
  currentUser = await navbarServices.checkLogInStatus();
  window.displayTicketsForSale = displayTicketsForSale;
  window.displayPurchasedTickets = displayPurchasedTickets;
  window.displaySoldTickets = displaySoldTickets;
  window.onSignOut = onSignOut;
  elemUserProfile.innerHTML = `<h2>Hello ${currentUser.userInfo.fname}! 😊</h2>
            <div class="user_info_wrapper">
            <div class="user_details_wrapper">
            <p>First Name: ${currentUser.userInfo.fname}</p>
            <p>Last Name: ${currentUser.userInfo.lname}</p>
            <p>Email: ${currentUser.userInfo.email}</p>
            </div>
            <p>"Welcome to your personal dashboard! Here, you can create new tickets, buy tickets, delete tickets, and search for your favorite events.</p><p> Manage your tickets effortlessly and enjoy the ultimate event experience."</p>
            <div class="user_tickets_info">
            <button onclick="displayTicketsForSale()">Tickets for Sale</button>
            <button onclick="displaySoldTickets()">Tickets Sold</button>
            <button onclick="displayPurchasedTickets()">Purchased Tickets</button>
            <div>
            <button onclick="window.location.href='../createTicket/createTicker.html'">Create new Ticket</button>
            </div>`;
  displayTicketsForSale();
}

async function displayPurchasedTickets() {
  const tickets = currentUser.purchasedTickets;
  displayTickets(tickets, "<p>You haven't purchased any tickets</p>");
}

async function displaySoldTickets() {
  const tickets = currentUser.tickets.filter((ticket) => !ticket.isonsale);
  displayTickets(tickets, "<p>You haven't sold any tickets</p>");
}
async function displayTicketsForSale() {
  const tickets = currentUser.tickets.filter((ticket) => ticket.isonsale);
  displayTickets(
    tickets,
    "<p>You don't have any tickets on sale currently</p>"
  );
}

function displayTickets(tickets, errorMessage) {
  elemTicketTable.innerHTML = ``;
  if (tickets.length != 0) {
    renderService.displayTickets(tickets, elemTicketTable);
  } else {
    elemTicketTable.innerHTML = errorMessage;
  }
}

function onSignOut() {
  usersService.signOut();
  window.location.assign("../home/index.html");
}
