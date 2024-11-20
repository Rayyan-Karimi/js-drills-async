// 1. Print out "Program started" at the start of your code
console.log("Program started");


// 2. Create a Promise that resolves after 3 seconds
let promise = new Promise((resolve) => {
   setTimeout(() => {
      resolve()
   }, 3000);
});


// 3. Log out the promise while it's pending
console.log("Pending promise:", promise);


// 4. Print out "Program in progress..." as well
console.log("Program in progress...");


// 5. Print out "Step 1 complete" when the first promise fulfills
promise
   .then(() => console.log("Step 1 complete"))
   // 6. Have the first promise return another new Promise that will fulfill after 3 seconds with the message: "Step 2 Complete"
   .then(() => new Promise((resolve) => {
      setTimeout(() => {
         // 7. Print out the message from the second promise after it fulfills ("Step 2 Complete")
         resolve("Step 2 complete.")
      }, 3000)
   })
      .then((message) => console.log(message)));