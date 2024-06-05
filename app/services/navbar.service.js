export const navBarHandler = () => {
  document.querySelector(".sign_in").onclick = () => {
    document.querySelector("#logInDialog").open = true;
  };
};
