// 1. Print out "Program started" at the start of your code
console.log("Program started");


// 2. Create a Promise that resolves after 3 seconds and rejects after 2 seconds
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise rejected.");
    }, 2000);
    setTimeout(() => {
        resolve();
    }, 3000);
});


// 3. Log out the promise while it's pending
console.log("Promise in pending:", promise);


// 4. Print out "Program in progress..." as well
console.log("Program in progress...");


// 5. & 6. Print out "Program complete" if the promise fulfills. Print out "Program failure" if the promise rejects
promise
    .then(() => console.log("Program complete:"))
    .catch((error) => console.log("Program failure:", error));
