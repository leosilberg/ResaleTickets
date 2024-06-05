window.onload = onInit;
import { usersService } from "../services/users.service.js";
const logInFormElem = document.querySelector("#logInForm");
function onInit() {
  window.onSearchClick = onSearchClick;
  logInFormElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onLogIn();
  });
}
async function onLogIn() {
  const username = logInFormElem.username.value;
  const password = logInFormElem.password.value;
  const isValidUser = await usersService.logInUser(username, password);
  if (isValidUser) {
    window.location.assign(`../userProfile/userProfile.html/${username}`);
  } else {
    console.log("username or password are incorrect!");
  }
}

function onSearchClick() {
  const elemInputSearch = document.getElementById("searchBarValue");
  location.assign(`../tickets/tickets.html?search=${elemInputSearch.value}`);
}
