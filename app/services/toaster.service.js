
export function showToast(message, type) {
    const toasterContainer = document.getElementById("toasterContainer");
    const toaster = document.createElement("div");
    toaster.className = `toaster ${type}`;
    toaster.textContent = message;

    toaster.addEventListener("click", () => {
        toasterContainer.removeChild(toaster);
    });

    // Append the toaster to the container

    toasterContainer.appendChild(toaster);

    // Remove the toaster after 3 seconds
    setTimeout(() => {
        if (toasterContainer.contains(toaster)) {
            toasterContainer.removeChild(toaster);
        }
    }, 3000);
}
