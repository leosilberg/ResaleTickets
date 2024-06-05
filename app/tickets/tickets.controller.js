import { ticketsService } from "../services/tickets.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { renderService } from "../services/render.service.js";


let currentPageNumber = 1;
let totalPageNumber;
const maxNumberPerPage = 5;
let elemSearch = document.getElementById("searchBar");
let ticketsPage;
window.onload = onInit;

async function onInit() {
  const queryParams = new URLSearchParams(window.location.search);
  elemSearch.value = queryParams.get("search");
  window.searchFunction = searchFunction;
  window.nextHandler = nextHandler;
  window.previousHandler = previousHandler;
  loadTickets();
  const currentUser = await navbarServices.checkLogInStatus();
}
async function searchFunction() {
  currentPageNumber = 1;
  loadTickets();
  currentPageNumber = 1;
  loadTickets();
}

async function loadTickets() {
  console.log(elemSearch.value);
  ticketsPage = await ticketsService.paginateTickets(
    currentPageNumber,
    maxNumberPerPage,
    elemSearch.value,
    ""
  );
  totalPageNumber = ticketsPage.maxPages;
  // currentPageNumber = ticketsPage.currentPageNum;
  console.log(ticketsPage.maxPages);
  displayTickets(ticketsPage.tickets);
  console.log(elemSearch.value);
  ticketsPage = await ticketsService.paginateTickets(
    currentPageNumber,
    maxNumberPerPage,
    elemSearch.value,
    ""
  );
  totalPageNumber = ticketsPage.maxPages;
  // currentPageNumber = ticketsPage.currentPageNum;
  console.log(ticketsPage.maxPages);
  displayTickets(ticketsPage.tickets);
}

function displayTickets(tickets) {
  const elemPaging = document.querySelector(".pagination");
  const ticketContainer = document.querySelector(".ticket_list");
  ticketContainer.innerHTML = ""; // Clear any previous content
  elemPaging.innerHTML = `<div id="pagesDesc">page ${currentPageNumber} out of ${totalPageNumber}</div><div id="pages_arrows"><button class="pageActionButton" onclick="previousHandler()"><</button><button class="pageActionButton" onclick="nextHandler()">></button></div>`;
  renderService.displayTickets(tickets, ticketContainer);

}

async function nextHandler() {
  if (currentPageNumber < totalPageNumber) {
    currentPageNumber++;
    loadTickets();
  }
}
async function previousHandler() {
  if (currentPageNumber > 1) {
    currentPageNumber--;
    loadTickets();
  }
}
