window.onload = onInit;
import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
const logInFormElem = document.querySelector("#logInForm");
function onInit() {
  window.onSearchClick = onSearchClick;
  navbarServices.signInHandler();
  navbarServices.loginHandler();
}

function onSearchClick() {
  const elemInputSearch = document.getElementById("searchBarValue");
  location.assign(`../tickets/tickets.html?search=${elemInputSearch.value}`);
}
