import { usersService } from "../services/users.service.js";
import { navbarServices } from "../services/navbar.service.js";
import { showToast } from "../services/toaster.service.js";

window.onload = onInit;
const logInFormElem = document.querySelector("#logInForm");
async function onInit() {
  carouselInit();
  window.onSearchClick = onSearchClick;
  window.onImageClick = onImageClick;
  await navbarServices.checkLogInStatus();

  // setTimeout(() => showToast("Operation successful!", "success"), 1000);

  // // Simulating error message
  // setTimeout(() => showToast("Something went wrong!", "error"), 3000);
}

function onSearchClick() {
  const elemInputSearch = document.getElementById("searchBarValue");
  location.assign(`../tickets/tickets.html?search=${elemInputSearch.value}`);
}
function onImageClick(category) {
  location.assign(`../tickets/tickets.html?search=${category}`);
}

//Carousel handler
function carouselInit() {
  const prevBtn = document.getElementById("carousel_previous_btn");
  const nextBtn = document.getElementById("carousel_next_btn");
  const carouselElem = document.querySelector(".main_categories");

  prevBtn.onclick = () => {
    updateCarouselPosition("0vw");
  };

  nextBtn.onclick = () => {
    updateCarouselPosition("-65vw");
  };

  function updateCarouselPosition(position) {
    const newTransformValue = `translateX(${position})`;
    carouselElem.style.transform = newTransformValue;
  }
}

// toaster

// function showToast(message, type) {
//   const toasterContainer = document.getElementById("toasterContainer");
//   const toaster = document.createElement("div");
//   toaster.className = `toaster ${type}`;
//   toaster.textContent = message;

//   toaster.addEventListener("click", () => {
//     toasterContainer.removeChild(toaster);
//   });

//   // Append the toaster to the container

//   toasterContainer.appendChild(toaster);

//   // Remove the toaster after 3 seconds
//   setTimeout(() => {
//     if (toasterContainer.contains(toaster)) {
//       toasterContainer.removeChild(toaster);
//     }
//   }, 3000);
// }
