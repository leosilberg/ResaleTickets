import { ticketsService } from "./tickets.service.js";
import { navbarServices } from "./navbar.service.js";
import {showToast} from "./toaster.service.js"
export const paymentsService = {
  loadPayPal,
};

async function loadPayPal(ticket, userId) {
  window.paypal
    .Buttons({
      style: {
        shape: "pill",
        layout: "vertical",
      },
      async createOrder() {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8888/api/orders",
            JSON.stringify({
              cart: {
                ticketId: ticket.id,
              },
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log(response);
          const orderData = response.data;

          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);

            throw new Error(errorMessage);
          }
        } catch (error) {
          console.log(error);
          resultMessage(
            `Could not initiate PayPal Checkout...<br><br>${error}`
          );
        }
      },
      async onApprove(data, actions) {
        try {
          const response = await fetch(
            `http://127.0.01:8888/api/orders/${data.orderID}/capture`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const orderData = await response.json();
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`
            );
          } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
              orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
            resultMessage(
              `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
            );
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2)
            );
            
           const purchaseResult= await ticketsService.purchaseTicket(ticket,userId);
           console.log(purchaseResult)
           showToast("Successfully purchased ticket","success")
            setTimeout(() => {
              navbarServices.goToUserProfile();
            }, 1500);
          }
        } catch (error) {
          console.error(error);
          resultMessage(
            `Sorry, your transaction could not be processed...<br><br>${error}`
          );
        }
      },
    })
    .render("#paypal-button-container");
}

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  console.log(message);
}
