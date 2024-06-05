window.onload = onInit;
import { usersService } from "../services/users.service.js";
import { navBarHandler } from "../services/navbar.service.js";
const logInFormElem = document.querySelector("#logInForm");
function onInit() {
  window.onSearchClick = onSearchClick;
  navBarHandler();
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
    const currentUser = usersService.getCurrentUser();
    console.log(currentUser);
    window.location.assign(
      `../userProfile/userProfile.html?id=${currentUser.id}`
    );
  } else {
    console.log("username or password are incorrect!");
  }
}

function onSearchClick() {
  const elemInputSearch = document.getElementById("searchBarValue");
  location.assign(`../tickets/tickets.html?search=${elemInputSearch.value}`);
}
