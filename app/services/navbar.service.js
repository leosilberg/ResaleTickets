import { usersService } from "../services/users.service.js";

const signInHandler = () => {
  document.querySelector(".sign_in").onclick = () => {
    document.querySelector("#logInDialog").open = true;
  };
};
const loginHandler = () => {
  const logInFormElem = document.querySelector("#logInForm");
  logInFormElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onLogIn(logInFormElem);
  });
};
function goToUserProfile() {
  const currentUser = usersService.getCurrentUser();
  console.log(currentUser);
  window.location.assign(
    `../userProfile/userProfile.html?id=${currentUser.id}`
  );
}

async function onLogIn(logInFormElem) {
  const username = logInFormElem.username.value;
  const password = logInFormElem.password.value;
  const isValidUser = await usersService.logInUser(username, password);

  if (isValidUser) {
    navbarServices.goToUserProfile();
  } else {
    console.log("username or password are incorrect!");
  }
}

export const navbarServices = {
  signInHandler,
  goToUserProfile,
  loginHandler,
};
