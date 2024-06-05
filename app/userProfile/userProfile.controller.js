import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { renderService } from "../services/render.service.js";

// const urlObj = new URL(window.location.href);
// const params = new URLSearchParams(urlObj.searchParams);
// const userID = params.get("id");
let currentUser;
const elemUserProfile = document.querySelector(".user_profile");
const elemUserTicketsOnSale = document.querySelector(".tickets_on_sale_by_me_list");
const elemUserTicketsSold = document.querySelector(".tickets_sold_by_me_table");
const elemActionHistory = document.querySelector(".action_history_table");

window.onload = onInit;

async function onInit() {
  currentUser = await navbarServices.checkLogInStatus();
  window.displayTicketsOnSaleByMe = displayTicketsOnSaleByMe;
  // window.displayActionHistory = displayActionHistory;
  elemUserProfile.innerHTML = `<h2>Hello ${currentUser.userInfo.fname}</h2>
            <div class="user_info_wrapper">
            <p>First Name: ${currentUser.userInfo.fname}</p>
            <p>Last Name: ${currentUser.userInfo.lname}</p>
            <p>Email: ${currentUser.userInfo.email}</p>
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

  // const headerRow = table.insertRow();
  // ["Category", "Date", "Title", "Price", "Location", "Serial Number"].forEach(
  //   (headerText) => {
  //     const th = document.createElement("th");
  //     th.textContent = headerText;
  //     headerRow.appendChild(th);
  //   }
  // );

  // tickets
  //   .filter((ticket) => ticket.isonsale)
  //   .forEach((ticket) => {
  //     console.log(ticket);
  //     const row = table.insertRow();
  //     [
  //       "category",
  //       "date",
  //       "title",
  //       "price",
  //       "location",
  //       "serialnumber",
  //     ].forEach((key) => {
  //       const cell = row.insertCell();
  //       cell.textContent = ticket[key];
  //     });
  //     row.onclick = () =>
  //       window.location.assign(
  //         `../singleTicket/singleTicket.html?id=${ticket.id}`
  //       );
  //   });

  // elemUserTicketsOnSale.appendChild(table);
}
