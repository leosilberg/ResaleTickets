import { ticketsService } from "../services/tickets.service.js";

let currentPageNumber = 1;
let totalPageNumber;
let maxNumberPerPage = 5;
let elemSearchValue = document.getElementById("searchBar").value;
let ticketsPage;
window.onload = onInit;

function onInit() {
    window.searchFunction = searchFunction;
    window.displayTickets = displayTickets;
    window.nextHandler = nextHandler;
    window.previousHandler = previousHandler;
}

async function searchFunction() {
    ticketsPage = await ticketsService.paginateTickets(currentPageNumber, maxNumberPerPage, elemSearchValue, "");
    totalPageNumber = ticketsPage.maxPages;
    console.log(ticketsPage.maxPages);
    displayTickets(ticketsPage.tickets);
}

function displayTickets(tickets) {
    const elemPaging = document.querySelector(".pagination");
    const ticketContainer = document.querySelector(".ticket_list");
    ticketContainer.innerHTML = ''; // Clear any previous content
    elemPaging.innerHTML = `<div>page ${currentPageNumber} out of ${totalPageNumber}</div><div id="pages-arrows"><button onclick="previousHandler()"><</button><button onclick="nextHandler()">></button></div>`;
    tickets.forEach(ticket => {
        const ticketElement = document.createElement("div");
        ticketElement.classList.add("ticket_card");
        ticketElement.innerHTML = `
        <div class="ticket_date">
                <div>${formatDate(ticket.date)}</div>
                <div>${ticket.time}</div>
            </div>
            <div class="ticket_info">
                <div class="ticket_title">${ticket.title}</div>
                <div class="ticket_location">${ticket.location}</div>
                <div class="ticket_seller">seller: ${ticket.userId}</div>
            </div>
            <div class="ticket_action">
                <a href="#" class="see_tickets">See tickets</a>
        `;
        ticketContainer.appendChild(ticketElement);
    });
}

function formatDate(dateString) {
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).toUpperCase();
}

async function nextHandler() {
    if (currentPageNumber < totalPageNumber) {
        currentPageNumber++;
        ticketsPage = await ticketsService.paginateTickets(currentPageNumber, maxNumberPerPage, elemSearchValue, "");
        console.log(ticketsService.paginateTickets(currentPageNumber, maxNumberPerPage, elemSearchValue, ""));
        console.log(ticketsPage.tickets);
        displayTickets(ticketsPage.tickets)
    }
}
async function previousHandler() {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        ticketsPage = await ticketsService.paginateTickets(currentPageNumber, maxNumberPerPage, elemSearchValue, "");
        console.log(ticketsService.paginateTickets(currentPageNumber, maxNumberPerPage, elemSearchValue, ""));
        console.log(ticketsPage.tickets);
        displayTickets(ticketsPage.tickets)
    }
}

