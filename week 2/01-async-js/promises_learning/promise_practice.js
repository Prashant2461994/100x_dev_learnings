//Approach #1
function myOwnSetTimeout(fn, duration) {
  setTimeout(fn, duration);
}

//Approach #2 Using promises

function myOwnSetTimeoutUsingPromise(duration) {
  let p = new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });

  return p;
}

myOwnSetTimeoutUsingPromise(10000).then(function () {
  console.log("log the first thing");
});

//Namaste Javascripy H.W
// Create a promise chain , createorder , proceedToPayment , showOrderSummary , updateWalletBalance in the give order respectively

const MIN_ORDER_ID = 99;
const MAX_ORDER_ID = 9999999;
const TIMEOUT = 1000;

var order = {
  isValid: true,
};

createorder(order)
  .then( orderId=> proceedToPayment(orderId)
  )
  .then(orderId => showOrderSummary(orderId)
  )
  .then(orderId => updateWalletBalance(orderId)
  )
  .catch(err => console.error("Error occured ::: ", err)
  );

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createorder(order) {
  return new Promise(function (resolve, reject) {
    if (!isValidOrder(order)) {
      const err = new Error("Not a Valid Order");
      reject(err);
    }

    setTimeout(() => {
      const orderId = getRandomNumber(MIN_ORDER_ID, MAX_ORDER_ID);
      resolve(orderId);
    }, TIMEOUT);
  });
}

function isValidOrder(order) {
  return order.isValid;
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    if (!orderId) {
      const err = new Error("Not valid OrderId :: " + orderId);
      reject(err);
    }

    setTimeout(() => {
      console.log("PAYMENT DONE FOR FOR ORDER ID :: " + orderId);
      resolve(orderId);
    }, TIMEOUT);
  });
}

function showOrderSummary(orderId) {
  return new Promise(function (resolve, reject) {
    if (!orderId) {
      reject(new Error("Not Valid OrderId"));
    }

    const orderSummary = [
      {
        id: getRandomNumber(MIN_ORDER_ID, MAX_ORDER_ID),
        item: "PanCake",
      },
      {
        id: getRandomNumber(MIN_ORDER_ID, MAX_ORDER_ID),
        item: "Bananas",
      },
    ];

    setTimeout(() => {
      console.log(":::: Order Summary ::: " + JSON.stringify(orderSummary));
      resolve(orderId);
    }, TIMEOUT);
  });
}

function updateWalletBalance(orderId) {
 
  return new Promise(function (resolve, reject) {
    if (!orderId) {
      const err = new Error("Cant update balance as it not valid orderId");
      reject(err);
    }

    setTimeout(() => {
      let msg = "WALLET UPDATED FOR ORDERID :: " + orderId;
      console.log(msg);
      resolve(msg);
    }, TIMEOUT);
  });
}
