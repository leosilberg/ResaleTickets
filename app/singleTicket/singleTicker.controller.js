import { ticketsService } from "../services/tickets.service.js";
import { navBarHandler } from "../services/navbar.service.js";

const button = document.querySelector(".button");
const elemTicketCardContainer = document.querySelector(
  ".ticket_card_container"
);
window.onload = onInit;

function onInit() {
  button.addEventListener("click", function (event) {
    displayTicketInfo();
    event.preventDefault();
  });
}

async function displayTicketInfo() {
  const res = await ticketsService.getTicketById("ticket1");
  console.log(res);
  elemTicketCardContainer.innerHTML = `<p>ID: ${res.id}</p>
  <p>User ID: ${res.userId}</p>
  <p>Category: ${res.category}</p>
  <p>Date: ${res.date}</p>
  <p>Title: ${res.title}</p>
  <p>Price: ${res.price}</p>
  <p>Location: ${res.location}</p>
  <p>Serial Number: ${res.serialnumber}</p>
  <p>Is on Sale: ${res.isonsale}</p>`;
}
