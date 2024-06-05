import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { showToast } from "../services/toaster.service.js";

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
      await usersService.createUser(userData);
      showToast("User created successfully", "success");
      setTimeout(() => {
        navbarServices.goToUserProfile();
      }, 1500);
    } else {
      if (!validUsername) showToast("Sorry, username already taken", "error");
      else showToast("Sorry, email already taken", "error");
    }
  } catch (err) {
    console.log(err);
  }
}
