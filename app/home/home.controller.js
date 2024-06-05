window.onload = onInit;
import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
const logInFormElem = document.querySelector("#logInForm");
async function onInit() {
  window.onSearchClick = onSearchClick;
  window.onImageClick = onImageClick;
  await navbarServices.checkLogInStatus();
}

function onSearchClick() {
  const elemInputSearch = document.getElementById("searchBarValue");
  location.assign(`../tickets/tickets.html?search=${elemInputSearch.value}`);
}
function onImageClick(category) {
  location.assign(`../tickets/tickets.html?search=${category}`);
}
