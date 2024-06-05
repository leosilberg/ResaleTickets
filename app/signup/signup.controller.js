import { usersService } from "../services/users.service.js";
const formElem = document.querySelector("#signUpForm");
window.onload = onInit;

function onInit() {
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onUserSubmit();
  });
}

async function onUserSubmit() {
  const username = formElem.username.value;
  const email = formElem.email.value;
  try {
    const validUsername = await usersService.validateUserName(username);
    const validEmail = await usersService.validateEmail(email);
    if (validUsername && validEmail) {
      const userData = new FormData(formElem);
      usersService.createUser(userData);
    } else {
      if (!validUsername) console.log("invalid userName");
      else console.log("invalid email");
    }
  } catch (err) {
    console.log(err);
  }
}
