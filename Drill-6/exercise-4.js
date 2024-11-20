/*
   HINT: Use Google/Documentation to help find an answer
   HINT2: You can Google for something like: "resolve 2 promises at the same time javascript"
*/


// 1. Create a Promise that resolves with the number 10 after 3 seconds
const promise1 = new Promise((resolve) => {
   setTimeout(() => {
      resolve(20);
   }, 5000);
});

// 2. Create another Promise that resolves with the number 20 after 5 seconds
const promise2 = new Promise((resolve) => {
   setTimeout(() => {
      resolve(10);
   }, 5000);
});

/**
 * How can we log out the sum (30) of these two resolved values once, after BOTH promises
   successfully fulfill?
 */


// We can use Promise.all() to wait for both promises to resolve
Promise.all([promise1, promise2])
   .then((values) => console.log("Using Promise.all:", values[0] + values[1])); // Output: 30


// We can also use async/await to achieve the same result
async function main() {
   const values = await Promise.all([promise1, promise2]);
   console.log("Wrapping await Promise.all in an async function:", values[0] + values[1]);
}
main(); // Output: 30


