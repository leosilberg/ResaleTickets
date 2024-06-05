export const ticketsService = {
  paginateTickets,
  createTicket,
  validateSerialNumber,
  getTicketById,
  purchaseTicket,
  deleteTicket,
};

const ticketsUrl = "http://localhost:8001/tickets";
const purchasedTicketsUrl = "http://localhost:8001/purchasedTickets";

async function createTicket(userId, ticketData) {
  try {
    const ticketResponse = await axios.post(ticketsUrl, {
      userId: userId,
      category: ticketData.get("category"),
      date: ticketData.get("date"),
      time: ticketData.get("time"),
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

async function deleteTicket(ticketIdToDelete) {
  try {
    const result = await axios.delete(`${ticketsUrl}/${ticketIdToDelete}`);
    return result.data;
  } catch (err) {
    throw new Error("Oops, failed to delete ticket!");
  }
}

async function getTicketById(id) {
  try {
    const response = await axios.get(`${ticketsUrl}/${id}?_embed=user`);
    // console.log("Ticket:", response.data);
    return { ...response.data, user: response.data.user?.userInfo };
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
  }
}
async function purchaseTicket(ticket, userID) {
  try {
    const purchaseResult = await axios.post(purchasedTicketsUrl, {
      ...ticket,
      userId: userID,
      isonsale: false,
    });
    console.log(purchaseResult.data);
    const ticketResult = await axios.patch(`${ticketsUrl}/${ticket.id}`, {
      isonsale: false,
    });
    console.log(ticketResult.data);
    return true;
  } catch (error) {
    console.log(error);
    // throw new Error("Must sign in first!");
  }
}

let _gTickets = [];
let prevSearchQuery = "";
async function paginateTickets(
  pageNum,
  ticketsPerPage,
  searchQuery,
  sortOrder
) {
  try {
    if (searchQuery !== prevSearchQuery || _gTickets.length == 0) {
      console.log("Fetch tickets");
      prevSearchQuery = searchQuery;
      const result = await axios.get(
        `${ticketsUrl}?_embed=user&_sort=${sortOrder}`
      );
      console.log(result.data.length);
      _gTickets = result.data.filter((ticket) => {
        return (
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      console.log(_gTickets.length);
    }

    const temp = _gTickets.slice(
      (pageNum - 1) * ticketsPerPage,
      pageNum * ticketsPerPage
    );

    return {
      tickets: temp.map((ticket) => {
        return { ...ticket, user: ticket.user?.userInfo };
      }),
      maxPages: Math.ceil(_gTickets.length / ticketsPerPage),
    };
  } catch (error) {
    console.log(error);
  }
}
