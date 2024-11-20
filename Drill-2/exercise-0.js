// 1. Print out "Program started" at the start of your code
console.log("Program started");


// 2. Create a Promise that resolves after 3 seconds
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});


// 3. Log out the promise while it's pending
console.log("Promise in pending:", promise);


// 4. Print out "Program in progress..." as well
console.log("Program in progress...")


// 5. Print out "Program complete" when the promise completes after 3 seconds
promise
    .then(() => console.log("Program complete"))

