import { userService } from "../services/users.service";
const formElem = document.querySelector("#signUpForm");
window.onload = onInit;

function onInit() {
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onUserSubmit();
  });
}

function onUserSubmit() {
  const username = formElem.username;
  const email = formElem.email;
  const validUsername = userService.validateUserName(username);
  const validEmail = userService.validateEmail(email);
  if (validUsername && validEmail) {
    const userData = new FormData(formElem);
    userService.createUser(userData);
  } else {
    // if(!validUsername) toasterError userName is already taken
    // else toasterError Email is already taken
  }
}
