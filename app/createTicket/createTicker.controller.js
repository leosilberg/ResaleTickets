import { ticketsService } from "../services/tickets.service.js";

window.onload = onInit;

function onInit() {
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onTicketSubmit();
  });
}
const userName = "testUser";

const formElem = document.querySelector(".create_ticket_form");

async function onTicketSubmit() {
  const serialnumber = formElem.serialnumber.value;
  const isValid = await ticketsService.validateSerialNumber(serialnumber);
  console.log(isValid);
  if (isValid) {
    const ticketData = new FormData(formElem);
    ticketsService.createTicket(userName, ticketData);
  } else {
    console.log("Serial number is taken");
  }
}
