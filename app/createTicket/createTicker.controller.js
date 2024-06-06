import { ticketsService } from "../services/tickets.service.js";
import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { showToast } from "../services/toaster.service.js";

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
    showToast("Ticket created successfully", "success");
    setTimeout(() => {
      navbarServices.goToUserProfile()
    }, 2000);
  } else {
    console.log("Serial number is taken");
    showToast("Serial number is taken", "error")

  }
}
