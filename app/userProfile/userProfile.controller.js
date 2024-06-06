import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { renderService } from "../services/render.service.js";

// const urlObj = new URL(window.location.href);
// const params = new URLSearchParams(urlObj.searchParams);
// const userID = params.get("id");
let currentUser;
const elemUserProfile = document.querySelector(".user_profile");
const elemUserTicketsOnSale = document.querySelector(
  ".tickets_on_sale_by_me_list"
);
const elemUserTicketsSold = document.querySelector(".tickets_sold_by_me_table");
const elemActionHistory = document.querySelector(".action_history_table");

window.onload = onInit;

async function onInit() {
  currentUser = await navbarServices.checkLogInStatus();
  window.displayTicketsOnSaleByMe = displayTicketsOnSaleByMe;
  window.displayActionHistory = displayActionHistory;
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
            <button onclick="displayTicketsOnSaleByMe()">Tickets On Sale By Me</button>
            <div>
            <button onclick="displayActionHistory()">Action History</button>
            <button onclick="window.location.href='../createTicket/createTicker.html'">Create new Ticket</button>
            </div>`;
}

async function displayTicketsOnSaleByMe() {
  const tickets = currentUser.tickets;
  console.log(tickets);
  elemUserTicketsOnSale.innerHTML = ``;
  renderService.displayTickets(tickets, elemUserTicketsOnSale);
}

function displayActionHistory() {

}

function onSignOut() {
  usersService.signOut();
  window.location.assign("../home/index.html");
}
