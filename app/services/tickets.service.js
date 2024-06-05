export const ticketsService = {
  createTicket,
  validateSerialNumber,
  getTicketById,
};

window.onload = onInit;

function onInit() {
  window.createTicket = createTicket;
  window.getTicketById = getTicketById;
}

const ticketsUrl = "http://localhost:8001/tickets";
const usersUrl = "http://localhost:8001/users";

async function createTicket(userId, ticketData) {
  try {
    const ticketResponse = await axios.post(ticketsUrl, {
      userId: userId,
      category: ticketData.get("category"),
      date: ticketData.get("date"),
      title: ticketData.get("title"),
      price: ticketData.get("price"),
      location: ticketData.get("location"),
      serialnumber: ticketData.get("serialnumber"),
      isonsale: true,
    });
    const createdTicket = ticketResponse.data;
    console.log("Ticket created successfully:", createdTicket);
    return createdTicket; // Return the created ticket
  } catch (error) {
    console.error("Error creating ticket and updating user:", error);
  }
}

async function validateSerialNumber(serialNumber) {
  const res = await axios.get(`${ticketsUrl}?serialnumber=${serialNumber}`);
  return res.data.length === 0;
}

const button = document.querySelector(".button");
button.addEventListener("click", function (event) {
  getTicketById("ticket3");
  event.preventDefault();
});

async function getTicketById(id) {
  try {
    const response = await axios.get(`${ticketsUrl}/${id}?_embed=user`);
    // console.log("Ticket:", response.data);
    return { ...response.data, user: response.data.user.userInfo };
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
  }
}
