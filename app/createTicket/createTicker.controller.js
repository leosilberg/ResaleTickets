import { ticketsService } from "../services/tickets.service.js";
import { usersService } from "../services/users.service.js";

window.onload = onInit;
let currentUser;
async function onInit() {
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onTicketSubmit();
  });
  try {
    currentUser = await usersService.getCurrentUser();
    console.log(currentUser);
  } catch (error) {
    console.log(error);
  }
}

const formElem = document.querySelector(".create_ticket_form");

async function onTicketSubmit() {
  const serialnumber = formElem.serialnumber.value;
  const isValid = await ticketsService.validateSerialNumber(serialnumber);
  console.log(isValid);
  if (isValid) {
    const ticketData = new FormData(formElem);
    console.log(currentUser);
    ticketsService.createTicket(currentUser.id, ticketData);

  } else {
    console.log("Serial number is taken");
  }
}
