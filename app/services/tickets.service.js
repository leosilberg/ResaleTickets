export const ticketsService = {
  paginateTickets,
  createTicket,
  validateSerialNumber,
  getTicketById,
};

const ticketsUrl = "http://localhost:8001/tickets";

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

async function getTicketById(id) {
  try {
    const response = await axios.get(`${ticketsUrl}/${id}?_embed=user`);
    // console.log("Ticket:", response.data);
    return { ...response.data, user: response.data.user.userInfo };
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
  }
}

async function paginateTickets(
  pageNum,
  ticketsPerPage,
  searchQuery,
  sortOrder
) {
  try {
    let temp = [];
    let maxPages = Number.MAX_SAFE_INTEGER;
    while (temp.length < ticketsPerPage && pageNum <= maxPages) {
      console.log(pageNum);
      const result = await axios.get(
        `${ticketsUrl}?_embed=user&_sort=${sortOrder}&_page=${pageNum}&_per_page=${ticketsPerPage}`
      );

      temp = temp.concat(
        result.data.data.filter((ticket) => {
          return (
            ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      );
      maxPages = result.data.pages;
      pageNum++;
    }
    temp = temp.slice(0, ticketsPerPage);
    console.log({
      tickets: temp.map((ticket) => {
        return { ...ticket, user: ticket.user?.userInfo };
      }),
      currentPageNum: pageNum - 1,
      maxPages: maxPages,
    });
    return {
      tickets: temp.map((ticket) => {
        return { ...ticket, user: ticket.user?.userInfo };
      }),
      currentPageNum: pageNum - 1,
      maxPages: maxPages,
    };
  } catch (error) {
    console.log(error);
  }
}
