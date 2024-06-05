import { usersService } from "../services/users.service.js";

const signInBtn = document.querySelector(".sign_in");

const signInHandler = () => {
  signInBtn.onclick = () => {
    document.querySelector("#logInDialog").open = true;
  };
  document.querySelector(".close_dialog").onclick = () => {
    document.querySelector("#logInDialog").open = false;
  };
};

const loginHandler = () => {
  const logInFormElem = document.querySelector("#logInForm");
  logInFormElem.addEventListener("submit", (e) => {
    e.preventDefault();
    onLogIn(logInFormElem);
  });
};
async function goToUserProfile() {
  const currentUser = await usersService.getCurrentUser();
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
    goToUserProfile();
  } else {
    console.log("username or password are incorrect!");
  }
}
function onGuestMode() {
  signInHandler();
  loginHandler();
}
function onUserMode() {
  signInBtn.innerText = "Profile";
  signInBtn.onclick = goToUserProfile;
}

async function checkLogInStatus() {
  try {
    //user logged in
    const currentUser = await usersService.getCurrentUser();
    onUserMode();
    return currentUser;
  } catch (error) {
    //user not logged in
    console.log(error);
    onGuestMode();
  }
}
export const navbarServices = {
  signInHandler,
  goToUserProfile,
  loginHandler,
  checkLogInStatus,
};
