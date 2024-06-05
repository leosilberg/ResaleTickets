export const ticketsService = {
  paginateTickets,
};

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
        `http://localhost:8001/tickets?_embed=user&_sort=${sortOrder}&_page=${pageNum}&_per_page=${ticketsPerPage}`
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
        return { ...ticket, user: ticket.user.userInfo };
      }),
      currentPageNum: pageNum - 1,
      maxPages: maxPages,
    });
    return {
      tickets: temp.map((ticket) => {
        return { ...ticket, user: ticket.user.userInfo };
      }),
      currentPageNum: pageNum - 1,
      maxPages: maxPages,
    };
  } catch (error) {
    console.log(error);
  }
}
