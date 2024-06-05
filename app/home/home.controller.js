window.onload = onInit;
import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
const logInFormElem = document.querySelector("#logInForm");
function onInit() {
  navbarServices.signInHandler();
  navbarServices.loginHandler();
}
