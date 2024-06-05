import { usersService } from "../services/users.service.js";



const elemUserProfile = document.querySelector(".user_profile");
const elemUserTicketsOnSale = document.querySelector(".tickets_on_sale_by_me_table");
const elemActionHistory = document.querySelector(".action_history_table");

window.onload = onInit;

function onInit() {
    window.displayTicketsOnSaleByMe = displayTicketsOnSaleByMe;
    // window.displayActionHistory = displayActionHistory;
    usersService.getUser("user1")
        .then(user => {
            elemUserProfile.innerHTML =
                `<h2>Hello ${user.userInfo.fname}</h2>
            <div class="user_info_wrapper">
            <p>First Name: ${user.userInfo.fname}</p>
            <p>Last Name: ${user.userInfo.lname}</p>
            <p>Email: ${user.userInfo.email}</p>
            <div class="user_tickets_info">
            <button onclick="displayTicketsOnSaleByMe()">Tickets On Sale By Me</button>
            <button onclick="displayActionHistory()">Action History</button>`
            console.log(user.tickets);
        })
        .catch(error => {
            console.error(error);
        });
}


async function displayTicketsOnSaleByMe() {
    usersService.getUser("user1")
        .then(user => {
            const tickets = user.tickets;
            console.log(tickets);
            elemUserTicketsOnSale.innerHTML = ``;
            const table = document.createElement('table');

            const headerRow = table.insertRow();
            ['Category', 'Date', 'Title', 'Price', 'Location', 'Serial Number'].forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            tickets.forEach(ticket => {
                console.log(ticket);
                const row = table.insertRow();
                ['category', 'date', 'title', 'price', 'location', 'serialnumber'].forEach(key => {
                    const cell = row.insertCell();
                    cell.textContent = ticket[key];
                });
            });

            elemUserTicketsOnSale.appendChild(table);
            console.log(user.tickets);
        })
        .catch(error => {
            console.error(error);
        });
}


